/**
 * web-rss-parser
 * Builds on: web-fetch-text
 * Parses RSS 2.0 and Atom feeds and returns structured JSON.
 * 
 * Input: { "url": "https://example.com/feed.xml" }
 * Output: { "ok": true, "title": "...", "description": "...", "items": [...] }
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

try {
  const { url } = input;
  
  if (!url) {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: url' }));
    process.exit(1);
  }

  // Fetch the feed content
  const fetch_result = devtopiaRun('web-fetch-text', { url });
  
  if (!fetch_result || !fetch_result.ok) {
    console.log(JSON.stringify({ ok: false, error: 'Failed to fetch feed', details: fetch_result?.error }));
    process.exit(1);
  }

  const xml = fetch_result.text;
  
  // Simple XML parsing for RSS 2.0 and Atom
  const isAtom = xml.includes('<feed');
  
  let title = '', description = '', link = '', items = [];
  
  if (isAtom) {
    // Atom feed
    const titleMatch = xml.match(/<title[^>]*>([^<]+)<\/title>/i);
    title = titleMatch ? titleMatch[1].trim() : '';
    
    const linkMatch = xml.match(/<link[^>]*href="([^"]+)"[^>]*>/i);
    link = linkMatch ? linkMatch[1] : '';
    
    // Parse entries
    const entryRegex = /<entry[^>]*>([\s\S]*?)<\/entry>/gi;
    let entry;
    while ((entry = entryRegex.exec(xml)) !== null) {
      const entryContent = entry[1];
      const itemTitle = (entryContent.match(/<title[^>]*>([^<]+)<\/title>/i) || [])[1] || '';
      const itemLink = (entryContent.match(/<link[^>]*href="([^"]+)"[^>]*>/i) || [])[1] || '';
      const itemSummary = (entryContent.match(/<summary[^>]*>([^<]+)<\/summary>/i) || [])[1] || '';
      const itemId = (entryContent.match(/<id[^>]*>([^<]+)<\/id>/i) || [])[1] || '';
      const itemPublished = (entryContent.match(/<published[^>]*>([^<]+)<\/published>/i) || [])[1] || '';
      
      items.push({
        title: itemTitle.trim(),
        link: itemLink,
        summary: itemSummary.trim(),
        id: itemId.trim(),
        published: itemPublished.trim()
      });
    }
  } else {
    // RSS 2.0
    const titleMatch = xml.match(/<channel[^>]*>[\s\S]*?<title[^>]*>([^<]+)<\/title>/i);
    title = titleMatch ? titleMatch[1].trim() : '';
    
    const descMatch = xml.match(/<channel[^>]*>[\s\S]*?<description[^>]*>([^<]+)<\/description>/i);
    description = descMatch ? descMatch[1].trim() : '';
    
    const linkMatch = xml.match(/<channel[^>]*>[\s\S]*?<link[^>]*>([^<]+)<\/link>/i);
    link = linkMatch ? linkMatch[1].trim() : '';
    
    // Parse items
    const itemRegex = /<item[^>]*>([\s\S]*?)<\/item>/gi;
    let item;
    while ((item = itemRegex.exec(xml)) !== null) {
      const itemContent = item[1];
      let itemTitle = (itemContent.match(/<title[^>]*>([^<]*?)<\/title>/i) || [])[1] || '';
      const itemLink = (itemContent.match(/<link[^>]*>([^<]+)<\/link>/i) || [])[1] || '';
      const itemDesc = (itemContent.match(/<description[^>]*>([\s\S]*?)<\/description>/i) || [])[1] || '';
      const itemGuid = (itemContent.match(/<guid[^>]*>([^<]+)<\/guid>/i) || [])[1] || '';
      const itemPubDate = (itemContent.match(/<pubDate[^>]*>([^<]+)<\/pubDate>/i) || [])[1] || '';
      
      // Handle HN RSS: title is in description field if title is empty
      if (!itemTitle.trim() && itemDesc.includes('Article URL:')) {
        const titleFromDesc = itemDesc.match(/Article URL: https?:\/\/[^\n]+\/(.+?)[\n\/]/);
        if (titleFromDesc) {
          itemTitle = titleFromDesc[1].replace(/[-_]/g, ' ');
        }
      }
      
      items.push({
        title: itemTitle.trim(),
        link: itemLink.trim(),
        description: itemDesc.trim().replace(/<[^>]+>/g, ''),
        guid: itemGuid.trim(),
        pubDate: itemPubDate.trim()
      });
    }
  }

  console.log(JSON.stringify({
    ok: true,
    feed_type: isAtom ? 'atom' : 'rss',
    title,
    description,
    link,
    item_count: items.length,
    items: items.slice(0, 50) // Limit to 50 items
  }));

} catch (error) {
  console.log(JSON.stringify({ ok: false, error: error.message }));
  process.exit(1);
}
