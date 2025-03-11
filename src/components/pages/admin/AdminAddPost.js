import React from "react";

const AdminAddPost = () => {
  return (
    <>
      <div class="container-fluid content mt-4">
        <h2>Add Post</h2>
        <div class="add-user-card">
          <form action="" class="d-flex flex-column">
            <div class="d-flex align-items-center inputs">
              <label for="fullname">
                Title <span class="asterix">*</span>
              </label>
              <input type="text" placeholder="Title" />
            </div>
            <div class="d-flex align-items-center inputs">
              <label for="fullname">
                Category <span class="asterix">*</span>
              </label>
              <select name="" id="">
                <option value="example">example</option>
                <option value="example">example</option>
                <option value="example">example</option>
                <option value="example">example</option>
                <option value="example">example</option>
              </select>
            </div>
            <div class="d-flex align-items-center inputs">
              <label for="fullname">
                Tags <span class="asterix">*</span>
              </label>
              <select name="" id="">
                <option value="example">example</option>
                <option value="example">example</option>
                <option value="example">example</option>
                <option value="example">example</option>
                <option value="example">example</option>
              </select>
            </div>
            <div class="d-flex align-items-center inputs">
              <label for="fullname">
                Date <span class="asterix">*</span>
              </label>
              <input type="date" placeholder="Enter your username" />
            </div>
            <div class="d-flex align-items-start inputs">
              <label for="fullname">
                Content <span class="asterix">*</span>
              </label>
              <textarea
                name=""
                id=""
                placeholder="Insert your content"
              ></textarea>
            </div>

            <button class="btn">Create User</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminAddPost;
