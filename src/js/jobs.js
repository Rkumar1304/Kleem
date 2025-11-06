fetch("assets/json/jobs.json")
    .then(res => res.json())
    .then(data => renderJobs(data.openPositions))
    .catch(err => console.error("Error loading jobs:", err));

  function renderJobs(openPositions) {
    const container = document.getElementById("jobsContainer");
    container.innerHTML = "";

    openPositions.forEach(dept => {
      const deptBox = document.createElement("div");
      deptBox.className = "job-box w-full flex flex-col";

      const heading = document.createElement("h3");
      heading.textContent = dept.department;

      const ul = document.createElement("ul");
      ul.className = "w-full flex flex-col";

      dept.jobs.forEach(job => {
        const li = document.createElement("li");
        li.className = "flex aic";

        li.innerHTML = `
          <div class="job-info flex flex-col">
            <div class="title">${job.title}</div>
            <div class="desc">${job.desc}</div>
          </div>
          <a class="btn-apply btn-outline" target="_blank" href="${job.link}">
            Apply Now
            <svg class="fill-primary">
              <use xlink:href="./assets/icons/icons.svg#arrowdown"></use>
            </svg>
          </a>
        `;

        ul.appendChild(li);
      });

      deptBox.appendChild(heading);
      deptBox.appendChild(ul);
      container.appendChild(deptBox);
    });
  }