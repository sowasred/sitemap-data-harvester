const sitemapService = require('../services/sitemapService');

exports.validateSitemap = async (req, res) => {
  try {
    const { url } = req.body;
    const isValid = await sitemapService.validateSitemap(url);
    res.json({ isValid });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.extractContent = async (req, res) => {
  try {
    const { url } = req.body;
    const result = await sitemapService.extractContent(url);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.downloadContent = async (req, res) => {
  try {
    const content = await sitemapService.getCombinedContent();
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Disposition', 'attachment; filename=combined_content.txt');
    res.send(content);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};