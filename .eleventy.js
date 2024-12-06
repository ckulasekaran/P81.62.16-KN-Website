/**
 * Eleventy Configuration File
 * This file configures plugins, collections, filters, and passthrough file copies for an Eleventy site.
 */

const navigationPlugin = require("@11ty/eleventy-navigation");
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function (eleventyConfig) {
  // Add plugins
  eleventyConfig.addPlugin(navigationPlugin);
  eleventyConfig.addPlugin(pluginRss);

  // Passthrough copy for static assets
  eleventyConfig.addPassthroughCopy("src/assets");

  // Passthrough copy for photoswipe
  eleventyConfig.addPassthroughCopy({
    "node_modules/photoswipe/dist": "assets/photoswipe"
  });

  /**
   * Collections
   */

  // Add collection for all posts, sorted in reverse chronological order
  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi.getFilteredByTag("post").reverse();
  });

  // Add collection for posts grouped by year, sorted by date within each year
  eleventyConfig.addCollection("postsByYear", function (collectionApi) {
    const posts = collectionApi.getFilteredByTag("post");
    const grouped = {};

    // Group posts by year
    posts.forEach((post) => {
      const year = new Date(post.date).getFullYear();
      if (!grouped[year]) grouped[year] = [];
      grouped[year].push(post);
    });

    // Sort posts within each year in reverse chronological order
    Object.keys(grouped).forEach((year) => {
      grouped[year].sort((a, b) => b.date - a.date);
    });

    // Return Map sorted by year in descending order
    return new Map(
      [...Object.entries(grouped)].sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
    );
  });

  // Add paginated posts collection, sorted in reverse chronological order
  eleventyConfig.addCollection("paginatedPosts", function (collectionApi) {
    return collectionApi.getFilteredByTag("post").sort((a, b) => b.date - a.date);
  });

  /**
   * Filters
   */

  // Filter to determine active navigation state
  eleventyConfig.addFilter("isActive", function (pageUrl, currentUrl) {
    return currentUrl === pageUrl ? "active" : "";
  });

  // Filter to group posts by year
  eleventyConfig.addFilter("groupByYear", (posts) => {
    const grouped = {};
    posts.forEach((post) => {
      const year = new Date(post.date).getFullYear();
      if (!grouped[year]) grouped[year] = [];
      grouped[year].push(post);
    });

    // Sort posts within each year
    Object.keys(grouped).forEach((year) => {
      grouped[year].sort((a, b) => b.date - a.date);
    });

    return new Map(
      [...Object.entries(grouped)].sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
    );
  });

  // Filter to extract the current page name from a URL
  eleventyConfig.addFilter("currentPage", function (currentPage) {
    return currentPage.split("/").pop();
  });

  // Filters for date formatting
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return new Date(dateObj).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      timeZone: "UTC",
    });
  });

  eleventyConfig.addFilter("formatDateLong", (dateObj) => {
    return new Date(dateObj).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    });
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return new Date(dateObj).toISOString();
  });

  eleventyConfig.addFilter("formatDate", (dateObj) => {
    return new Date(dateObj).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      timeZone: "UTC",
    });
  });

  // Filter to slice arrays
  eleventyConfig.addFilter("slice", (array, start, end) => {
    return array.slice(start, end);
  });

  // Paired Short Codes
  eleventyConfig.addPairedShortcode(
    "gallery", (data) => {
      const galleryContent = markdownLibrary.render(data);
      return `<div class="gallery">${galleryContent}</div>`;
    }
  );

  /**
   * Configuration
   */
  return {
    dir: {
      input: "src",
      output: "_site",
    }
  };
};