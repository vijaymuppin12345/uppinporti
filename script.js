
// =====================================
// LOAD PORTFOLIO DATA USING FETCH API
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    fetch("data.json")
        .then(response => {

            if (!response.ok) {
                throw new Error("Unable to load JSON data");
            }

            return response.json();
        })

        .then(data => {

            document.getElementById("loading").style.display = "none";

            document.getElementById("portfolio-content").hidden = false;

            // Display all portfolio sections
            loadPersonalDetails(data.personal);
            loadAbout(data.about);
            loadSkills(data.skills);
            loadProjects(data.projects);
            loadEducation(data.education);
            loadCertifications(data.certifications);
            loadSocialLinks(data.social);

            // Footer information
            document.getElementById("footer-name").textContent =
                data.personal.name;

            document.getElementById("copyright-name").textContent =
                data.personal.name;

            document.getElementById("current-year").textContent =
                new Date().getFullYear();

        })

        .catch(error => {

            console.error("Error:", error);

            document.getElementById("loading").style.display = "none";

            const errorMessage =
                document.getElementById("error-message");

            errorMessage.hidden = false;

        });

});


// =====================================
// PERSONAL DETAILS
// =====================================

function loadPersonalDetails(personal) {

    document.getElementById("logo").textContent =
        personal.name;

    document.getElementById("student-name").textContent =
        personal.name;

    document.getElementById("student-role").textContent =
        personal.role;

    document.getElementById("student-intro").textContent =
        personal.introduction;

    document.getElementById("career-goal").textContent =
        "Career Goal: " + personal.careerGoal;

    document.getElementById("student-email").textContent =
        personal.email;

    document.getElementById("student-phone").textContent =
        personal.phone;

    const profileImage =
        document.getElementById("profile-image");

    profileImage.src = personal.profileImage;
    profileImage.alt = personal.name + " Profile Photo";

    const resumeLink =
        document.getElementById("resume-link");

    resumeLink.href = personal.resume;

}


// =====================================
// ABOUT SECTION
// =====================================

function loadAbout(about) {

    document.getElementById("about-description").textContent =
        about.description;

}


// =====================================
// SKILLS SECTION
// =====================================

function loadSkills(skills) {

    const container =
        document.getElementById("skills-container");

    container.innerHTML = "";

    skills.forEach(skill => {

        const skillCard = document.createElement("div");

        skillCard.className = "col-md-6 col-lg-4";

        const card = document.createElement("div");
        card.className = "skill-card";

        const icon = document.createElement("i");
        icon.className = `bi ${skill.icon} skill-icon`;

        const title = document.createElement("h5");
        title.textContent = skill.name;

        const progress = document.createElement("div");
        progress.className = "progress";

        const bar = document.createElement("div");
        bar.className = "progress-bar";

        const percentage = Math.min(
            100,
            Math.max(0, Number(skill.level) || 0)
        );

        bar.style.width = percentage + "%";

        bar.setAttribute("role", "progressbar");
        bar.setAttribute("aria-valuenow", percentage);
        bar.setAttribute("aria-valuemin", "0");
        bar.setAttribute("aria-valuemax", "100");

        progress.appendChild(bar);

        const levelText = document.createElement("p");
        levelText.className = "mt-2 mb-0 text-muted";
        levelText.textContent = percentage + "% Proficiency";

        card.appendChild(icon);
        card.appendChild(title);
        card.appendChild(progress);
        card.appendChild(levelText);

        skillCard.appendChild(card);

        container.appendChild(skillCard);

    });

}


// =====================================
// PROJECTS SECTION
// =====================================

function loadProjects(projects) {

    const container =
        document.getElementById("projects-container");

    container.innerHTML = "";

    projects.forEach(project => {

        const projectColumn = document.createElement("div");

        projectColumn.className = "col-md-6 col-lg-4";

        const card = document.createElement("div");

        card.className = "project-card";

        const image = document.createElement("img");

        image.src = project.image;
        image.alt = project.name;
        image.className = "project-image";
        image.loading = "lazy";

        const content = document.createElement("div");

        content.className = "project-content";

        const title = document.createElement("h5");

        title.textContent = project.name;

        const description = document.createElement("p");

        description.textContent = project.description;

        const technologies = document.createElement("div");

        project.technologies.forEach(technology => {

            const badge = document.createElement("span");

            badge.className = "tech-badge";

            badge.textContent = technology;

            technologies.appendChild(badge);

        });

        const link = document.createElement("a");

        link.href = project.link;

        link.textContent = "View Project →";

        link.className = "project-link";

        link.target = "_blank";

        link.rel = "noopener noreferrer";

        content.appendChild(title);
        content.appendChild(description);
        content.appendChild(technologies);
        content.appendChild(link);

        card.appendChild(image);
        card.appendChild(content);

        projectColumn.appendChild(card);

        container.appendChild(projectColumn);

    });

}


// =====================================
// EDUCATION SECTION
// =====================================

function loadEducation(education) {

    const container =
        document.getElementById("education-container");

    container.innerHTML = "";

    education.forEach(item => {

        const card = document.createElement("div");

        card.className = "education-card";

        const title = document.createElement("h4");

        title.textContent = item.course;

        const college = document.createElement("p");

        college.textContent = item.college;

        const year = document.createElement("p");

        year.className = "year";

        year.textContent = item.year;

        const details = document.createElement("p");

        details.textContent = item.details;

        card.appendChild(title);
        card.appendChild(college);
        card.appendChild(year);
        card.appendChild(details);

        container.appendChild(card);

    });

}


// =====================================
// CERTIFICATIONS SECTION
// =====================================

function loadCertifications(certifications) {

    const container =
        document.getElementById("certifications-container");

    container.innerHTML = "";

    certifications.forEach(certificate => {

        const column = document.createElement("div");

        column.className = "col-md-6 col-lg-4";

        const card = document.createElement("div");

        card.className = "certificate-card";

        const icon = document.createElement("i");

        icon.className = "bi bi-award-fill";

        const title = document.createElement("h5");

        title.textContent = certificate.name;

        const organization = document.createElement("p");

        organization.textContent = certificate.organization;

        const date = document.createElement("p");

        date.className = "text-muted";

        date.textContent = certificate.date;

        card.appendChild(icon);
        card.appendChild(title);
        card.appendChild(organization);
        card.appendChild(date);

        if (certificate.link) {

            const link = document.createElement("a");

            link.href = certificate.link;
            link.textContent = "View Certificate";
            link.target = "_blank";
            link.rel = "noopener noreferrer";

            card.appendChild(link);

        }

        column.appendChild(card);

        container.appendChild(column);

    });

}


// =====================================
// SOCIAL MEDIA LINKS
// =====================================

function loadSocialLinks(social) {

    const container =
        document.getElementById("social-links");

    container.innerHTML = "";

    Object.entries(social).forEach(([platform, url]) => {

        if (!url) return;

        const link = document.createElement("a");

        link.href = url;

        link.target = "_blank";

        link.rel = "noopener noreferrer";

        link.setAttribute("aria-label", platform);

        const icon = document.createElement("i");

        if (platform === "github") {
            icon.className = "bi bi-github";
        }

        else if (platform === "linkedin") {
            icon.className = "bi bi-linkedin";
        }

        else if (platform === "instagram") {
            icon.className = "bi bi-instagram";
        }

        else {
            icon.className = "bi bi-globe";
        }

        link.appendChild(icon);

        container.appendChild(link);

    });

}


// =====================================
// CONTACT FORM VALIDATION
// =====================================

document.getElementById("contact-form")
    .addEventListener("submit", function (event) {

        event.preventDefault();

        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const subject =
            document.getElementById("subject").value.trim();

        const message =
            document.getElementById("message").value.trim();

        const formMessage =
            document.getElementById("form-message");

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name || !email || !subject || !message) {

            formMessage.textContent =
                "Please fill in all the fields.";

            formMessage.style.color = "red";

            return;

        }

        if (!emailPattern.test(email)) {

            formMessage.textContent =
                "Please enter a valid email address.";

            formMessage.style.color = "red";

            return;

        }

        if (message.length < 10) {

            formMessage.textContent =
                "Message must contain at least 10 characters.";

            formMessage.style.color = "red";

            return;

        }

        formMessage.textContent =
            "Thank you! Your form has passed validation. Connect a backend or email service to actually send your message.";

        formMessage.style.color = "green";

        document.getElementById("contact-form").reset();

    });
