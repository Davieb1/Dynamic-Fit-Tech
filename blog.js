document.addEventListener("DOMContentLoaded", () => {
    const blogList = document.getElementById("blogList");
    const blogModal = document.getElementById("blogModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalContent = document.getElementById("modalContent");
    const modalDate = document.getElementById("modalDate");
    const modalLikes = document.getElementById("modalLikes");
    const closeModal = document.querySelector(".close-modal");
    const addBlogBtn = document.getElementById("addBlogBtn");
    const deleteAllBtn = document.getElementById("deleteAllBlogs");
    const deleteSelectedBtn = document.getElementById("deleteSelectedBlogs");
    const blogFormContainer = document.getElementById("blogFormContainer");
    const submitBlog = document.getElementById("submitBlog");

    document.addEventListener("DOMContentLoaded", () => {
        // Ensure the blog modal is hidden on page load
        blogModal.style.display = "none";
    });
    
    let blogs = JSON.parse(localStorage.getItem("blogs")) || [];

    // **🔹 Function to Display Blogs Instantly**
    function displayBlogs() {
        blogList.innerHTML = "";
        blogs.sort((a, b) => b.likes - a.likes); // Sort by likes (most liked at the top)

        blogs.forEach((blog, index) => {
            const blogPreview = document.createElement("div");
            blogPreview.classList.add("blog-preview");
            if (index === 0) blogPreview.classList.add("pinned-blog"); // Highlight most liked blog

            blogPreview.innerHTML = `
                <input type="radio" name="selectedBlog" value="${index}" class="blog-radio">
                <h3>${blog.title}</h3>
                <p class="blog-date">${blog.date}</p>
                <p class="blog-content">${blog.content.substring(0, 150)}... <span class="read-more" data-index="${index}">Read More</span></p>
                <div class="like-dislike">
                    <button class="like-btn" data-index="${index}">👍 Like (${blog.likes})</button>
                    <button class="dislike-btn" data-index="${index}">👎 Dislike</button>
                </div>
            `;

            blogList.appendChild(blogPreview);
        });
    }

    // **🔹 Open Blog Modal**
    blogList.addEventListener("click", (event) => {
        if (event.target.classList.contains("read-more")) {
            const index = event.target.dataset.index;
            const blog = blogs[index];

            modalTitle.textContent = blog.title;
            modalDate.textContent = `Published on: ${blog.date}`;
            modalContent.textContent = blog.content;
            modalLikes.textContent = blog.likes;

            blogModal.style.display = "block";
        }
    });

    // **🔹 Close Blog Modal**
    closeModal.addEventListener("click", () => {
        blogModal.style.display = "none";
    });

    // **🔹 Like & Dislike Feature**
    blogList.addEventListener("click", (event) => {
        const index = event.target.dataset.index;

        if (event.target.classList.contains("like-btn")) {
            blogs[index].likes++;
            localStorage.setItem("blogs", JSON.stringify(blogs));
            displayBlogs();
        }

        if (event.target.classList.contains("dislike-btn")) {
            blogs[index].dislikes++;
            displayBlogs();
        }
    });

    // **🔹 Toggle Blog Form Visibility**
    addBlogBtn.addEventListener("click", () => {
        blogFormContainer.classList.toggle("hidden");
    });

    // **🔹 Admin Blog Posting (Appears Instantly)**
    submitBlog.addEventListener("click", () => {
        const password = document.getElementById("adminPassword").value;
        if (password !== "yourAdminPassword") {
            alert("❌ Incorrect password!");
            return;
        }

        const title = document.getElementById("blogTitle").value;
        const content = document.getElementById("blogContent").value;
        const date = new Date().toLocaleString();

        if (title && content) {
            blogs.push({ title, content, date, likes: 0, dislikes: 0 });
            localStorage.setItem("blogs", JSON.stringify(blogs));
            alert("✅ Blog posted successfully!");

            // 🔹 **Update the blog list instantly without reloading**
            displayBlogs();
            document.getElementById("blogTitle").value = "";
            document.getElementById("blogContent").value = "";
        }
    });

    // Open Blog Modal with Improved Formatting
blogList.addEventListener("click", (event) => {
    if (event.target.classList.contains("read-more")) {
        const index = event.target.dataset.index;
        const blog = blogs[index];

        modalTitle.textContent = blog.title;
        modalDate.textContent = `Published on: ${blog.date}`;

        // Automatically break content into paragraphs
        const formattedContent = blog.content
            .split("\n")
            .map(paragraph => `<p>${paragraph.trim()}</p>`)
            .join(""); 

        modalContent.innerHTML = formattedContent;
        modalLikes.textContent = blog.likes;

        blogModal.style.display = "block";
    }
});


    // **🔹 Admin Delete Selected Blog (Password Protected)**
    deleteSelectedBtn.addEventListener("click", () => {
        const password = prompt("Enter Admin Password to DELETE SELECTED BLOG:");
        if (password !== "yourAdminPassword") {
            alert("❌ Incorrect password!");
            return;
        }

        const selectedBlogIndex = document.querySelector('input[name="selectedBlog"]:checked');
        if (!selectedBlogIndex) {
            alert("❌ No blog selected! Please choose a blog to delete.");
            return;
        }

        blogs.splice(selectedBlogIndex.value, 1);
        localStorage.setItem("blogs", JSON.stringify(blogs));
        alert("✅ Selected blog deleted successfully!");
        displayBlogs();
    });

    // **🔹 Admin Delete All Blogs (Password Protected)**
    deleteAllBtn.addEventListener("click", () => {
        const password = prompt("Enter Admin Password to DELETE ALL BLOGS:");
        if (password !== "yourAdminPassword") {
            alert("❌ Incorrect password!");
            return;
        }

        if (confirm("⚠️ Are you sure you want to delete ALL blogs? This cannot be undone!")) {
            localStorage.removeItem("blogs");
            blogs = [];
            alert("✅ All blogs deleted successfully!");
            displayBlogs();
        }
    });

    // **🔹 Display Blogs on Page Load (NO AUTO-DELETION)**
    displayBlogs();
});
