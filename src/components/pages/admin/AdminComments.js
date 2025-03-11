import React from "react";

const AdminComments = () => {
  return (
    <>
      <div className="container-fluid content mt-4">
        <div className="row g-4">
          <div className="col-md-4">
            <div className="user-card">
              <h3>Comments</h3>
              <img src="" alt="" />
              <span>10</span>
            </div>
          </div>
          <div className="col-md-4">
            <div className="user-card">
              <h3>Pending Comments</h3>
              <span className="user-percent"></span>
              user bar
            </div>
          </div>
          <div className="col-md-4"></div>
          <h3>Posts</h3>
          <div className="col-md-6 d-flex align-items-center">
            <div className="adminsearchbar">
              <input type="text" className="adminsearchinput" placeholder="Search" />
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
          </div>
          <div className="col-md-6 text-md-end">
            <button className="btn btn-primary">Create Post</button>
          </div>
          <div className="col-12">
            <div className="scroller">
              <table>
                <thead>
                  <tr>
                    <th className="text-start checkbox">
                      <input type="checkbox" />
                      <i className="fa-solid fa-chevron-down checkboxarrow"></i>
                    </th>
                    <th colspan="8"></th>
                  </tr>
                  <tr className="row2">
                    <th> </th>
                    <th>
                      ID{" "}
                      <a href="">
                        <i className="fa-solid fa-sort"></i>
                      </a>
                    </th>
                    <th>Content</th>
                    <th>Author</th>
                    <th>
                      Publish Date{" "}
                      <a href="">
                        <i className="fa-solid fa-sort"></i>
                      </a>
                    </th>
                    <th>
                      Related Post{" "}
                      <a href="">
                        <i className="fa-solid fa-sort"></i>
                      </a>
                    </th>
                    <th>
                      Status{" "}
                      <a href="">
                        <i className="fa-solid fa-sort"></i>
                      </a>
                    </th>
                    <th className="text-center">Approve</th>
                    <th className="text-center">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-start">
                      <input type="checkbox" />
                    </td>
                    <td>1</td>
                    <td>Lorem ipsum...</td>
                    <td>New Author</td>
                    <td>20/20/2020 15:30</td>
                    <td>Post title</td>
                    <td>Published</td>
                    <td className="text-center">
                      <a href="edit-post.html">
                        <i className="fa-solid fa-check"></i>
                      </a>
                    </td>
                    <td className="text-center">
                      <a href="#">
                        <i className="fa-solid fa-trash-can red"></i>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminComments;
