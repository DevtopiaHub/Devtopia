/**
 * github-repo-health-dashboard
 * Builds on: github-repo-info, github-issues-list, api-health-check, email-send-sendgrid (via devtopia-runtime)
 *
 * Composes a monitoring pipeline that checks GitHub repository health and sends email alerts.
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

try {
  const { owner, repo, token, sendgrid_api_key, email_to, email_from, health_check_url } = input;

  // Validate required fields
  if (!owner || !repo) {
    console.log(JSON.stringify({ ok: false, error: 'Missing required fields: owner, repo' }));
    process.exit(1);
  }

  // Step 1: Fetch GitHub repository metadata
  const repoInfo = devtopiaRun('github-repo-info', { owner, repo, token });
  if (!repoInfo || !repoInfo.ok || !repoInfo.data) {
    console.log(JSON.stringify({ ok: false, error: 'Failed to fetch repository info' }));
    process.exit(1);
  }

  const repoData = repoInfo.data;
  const repoUrl = repoData.html_url || `https://github.com/${owner}/${repo}`;
  const homepageUrl = repoData.homepage || null;

  // Step 2: List GitHub issues (open issues count)
  const issuesResult = devtopiaRun('github-issues-list', { owner, repo, token, state: 'open', per_page: 100 });
  const openIssues = issuesResult?.ok && Array.isArray(issuesResult.data) ? issuesResult.data.length : 0;

  // Step 3: Check API/website health if URL provided
  let healthCheck = null;
  const urlToCheck = health_check_url || homepageUrl;
  if (urlToCheck) {
    try {
      healthCheck = devtopiaRun('api-health-check', { url: urlToCheck, attempts: 2 });
    } catch (err) {
      // Health check failure is not fatal
      healthCheck = { ok: false, error: err.message };
    }
  }

  // Step 4: Format health report
  const healthStatus = {
    repo: {
      name: repoData.full_name || `${owner}/${repo}`,
      url: repoUrl,
      stars: repoData.stargazers_count || 0,
      forks: repoData.forks_count || 0,
      open_issues: openIssues,
      is_archived: repoData.archived || false,
      is_private: repoData.private || false,
      last_updated: repoData.updated_at || null,
    },
    website: urlToCheck ? {
      url: urlToCheck,
      healthy: healthCheck?.ok || false,
      status: healthCheck?.status || null,
      hash: healthCheck?.hash || null,
    } : null,
    timestamp: new Date().toISOString(),
  };

  // Step 5: Send email alert if credentials provided
  let emailSent = false;
  if (sendgrid_api_key && email_to && email_from) {
    const subject = `Repo Health Report: ${owner}/${repo}`;
    const reportText = formatHealthReport(healthStatus);
    
    try {
      const emailResult = devtopiaRun('email-send-sendgrid', {
        api_key: sendgrid_api_key,
        from: email_from,
        to: email_to,
        subject,
        text: reportText,
      });
      emailSent = emailResult?.ok || false;
    } catch (err) {
      // Email failure is not fatal
      emailSent = false;
    }
  }

  // Return comprehensive health dashboard
  console.log(JSON.stringify({
    ok: true,
    health: healthStatus,
    email_sent: emailSent,
    steps: ['github-repo-info', 'github-issues-list', 'api-health-check', 'email-send-sendgrid'],
  }));

} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}

/**
 * Format health report as plain text for email
 */
function formatHealthReport(health) {
  const lines = [];
  lines.push(`GitHub Repository Health Dashboard`);
  lines.push(`====================================`);
  lines.push(``);
  lines.push(`Repository: ${health.repo.name}`);
  lines.push(`URL: ${health.repo.url}`);
  lines.push(`Stars: ${health.repo.stars}`);
  lines.push(`Forks: ${health.repo.forks}`);
  lines.push(`Open Issues: ${health.repo.open_issues}`);
  lines.push(`Archived: ${health.repo.is_archived ? 'Yes' : 'No'}`);
  lines.push(`Private: ${health.repo.is_private ? 'Yes' : 'No'}`);
  if (health.repo.last_updated) {
    lines.push(`Last Updated: ${health.repo.last_updated}`);
  }
  lines.push(``);
  
  if (health.website) {
    lines.push(`Website Health Check:`);
    lines.push(`URL: ${health.website.url}`);
    lines.push(`Status: ${health.website.healthy ? '✓ Healthy' : '✗ Unhealthy'}`);
    if (health.website.status) {
      lines.push(`HTTP Status: ${health.website.status}`);
    }
    if (health.website.hash) {
      lines.push(`Response Hash: ${health.website.hash.substring(0, 16)}...`);
    }
    lines.push(``);
  }
  
  lines.push(`Report Generated: ${health.timestamp}`);
  return lines.join('\n');
}
