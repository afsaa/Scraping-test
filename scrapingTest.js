const fs = require("fs");
const puppeteer = require("puppeteer");

(async () => {
  try {
    // We open an instance of puppeteer and we can see the actual browser
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(
      "https://www.iceenterprise.com/careers/jobs-results/?category=All&location=All"
    );

    const jobsResult = await page.evaluate(() => {
      // Here we are in the browser's context
      let jobs = [];
      let baseUrl = document.URL.slice(0, 29);
      const jobsTitles = document.querySelectorAll(".job-search-result h3");
      const jobsLocations = document.querySelectorAll(".job-search-result p");
      const jobsUrls = document.querySelectorAll(".job-search-result a");

      // Looping through the titles, urls and locations of the jobs and saving its data
      jobsTitles.forEach((jobTitle) => {
        jobs.push({ title: `${jobTitle.textContent}`, url: "", location: "" });
      });
      jobsUrls.forEach((jobUrl, key) => {
        jobs[key].url = baseUrl + jobUrl.getAttribute("href");
      });
      jobsLocations.forEach((jobLocation, key) => {
        jobs[key].location = jobLocation.textContent;
      });
      console.log(jobs);
      return jobs;
    });

    // Close puppeteer
    browser.close();

    // Writing the the jobs data in a local json file
    let data = JSON.stringify(jobsResult);
    fs.writeFile("jobs.json", data, (err) => {
      if (err) throw err;
      console.log("Jobs writen successfuly!");
    });
  } catch (error) {
    console.error(error);
  }
})();
