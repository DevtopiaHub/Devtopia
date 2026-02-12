// github-repo-slug - Normalize GitHub repo slug.
function main(params) {
  const slugInput = typeof params?.slug === 'string' ? params.slug : '';
  const ownerInput = typeof params?.owner === 'string' ? params.owner : '';
  const repoInput = typeof params?.repo === 'string' ? params.repo : '';
  let owner = ownerInput;
  let repo = repoInput;
  if (slugInput.includes('/')) {
    const parts = slugInput.split('/');
    owner = owner || parts[0];
    repo = repo || parts[1];
  }
  if (!owner || !repo) return { error: 'owner/repo required' };
  const slug = owner + '/' + repo;
  return { owner, repo, slug, api_base: 'https://api.github.com/repos/' + slug };
}
