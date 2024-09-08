const axios = require('axios');
const xml2js = require('xml2js');
const puppeteerUtils = require('../utils/puppeteerUtils');

let combinedContent = '';

exports.validateSitemap = async (url) => {
  try {
    // Fetch the sitemap XML from the provided URL
    const response = await axios.get(url);
    
    // Create a new XML parser
    const parser = new xml2js.Parser();
    
    // Attempt to parse the XML content
    await parser.parseStringPromise(response.data);
    
    // If parsing is successful, return true (valid sitemap)
    return true;
  } catch (error) {
    // If any error occurs during fetching or parsing, return false (invalid sitemap)
    return false;
  }
};

exports.extractContent = async (url) => {
  try {
    const response = await axios.get(url);
    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(response.data);
    
    const urls = result.urlset.url.map(item => item.loc[0]);
    
    combinedContent = '';
    for (let i = 0; i < urls.length; i++) {
      const pageContent = await puppeteerUtils.getPageContent(urls[i]);
      combinedContent += `\n\n--- Page ${i + 1}: ${urls[i]} ---\n\n${pageContent}`;
    }
    
    return { message: 'Content extracted successfully', totalPages: urls.length };
  } catch (error) {
    throw new Error('Failed to extract content: ' + error.message);
  }
};

exports.getCombinedContent = () => {
  return combinedContent;
};