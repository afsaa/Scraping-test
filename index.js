// Using fetch to get the jobs data from the json file
const jobsResponse = fetch("./jobs.json").then((res) => {
  return res.json();
});

// Looping through the jobs array and inserting the data in the table body
jobsResponse.then((jobs) => {
  const tableBody = document.querySelector("tbody");
  jobs.map((job, index) => {
    tableBody.innerHTML += `<tr>
                    <td>${index + 1}</td>
                    <td>${job.title}</td>
                    <td>${job.location}</td>
                    <td><a href='${job.url}'>${job.url}</a></td>
                </tr>`;
  });
});
