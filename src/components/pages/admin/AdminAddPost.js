import React from "react";

const AdminAddPost = () => {
  return (
    <>
      <div className="container-fluid content mt-4">
        <h2>Add Post</h2>
        <div className="add-user-card">
          <form action="" className="d-flex flex-column">
            <div className="d-flex align-items-center inputs">
              <label for="fullname">
                Title <span className="asterix">*</span>
              </label>
              <input type="text" placeholder="Title" />
            </div>
            <div className="d-flex align-items-center inputs">
              <label for="fullname">
                Category <span className="asterix">*</span>
              </label>
              <select name="" id="">
                <option value="example">example</option>
                <option value="example">example</option>
                <option value="example">example</option>
                <option value="example">example</option>
                <option value="example">example</option>
              </select>
            </div>
            <div className="d-flex align-items-center inputs">
              <label for="fullname">
                Tags <span className="asterix">*</span>
              </label>
              <select name="" id="">
                <option value="example">example</option>
                <option value="example">example</option>
                <option value="example">example</option>
                <option value="example">example</option>
                <option value="example">example</option>
              </select>
            </div>
            <div className="d-flex align-items-center inputs">
              <label for="fullname">
                Date <span className="asterix">*</span>
              </label>
              <input type="date" placeholder="Enter your username" />
            </div>
            <div className="d-flex align-items-start inputs">
              <label for="fullname">
                Content <span className="asterix">*</span>
              </label>
              
            </div>

            <button className="btn">Create User</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminAddPost;
