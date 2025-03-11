import React from "react";

const AdminComments = () => {
  return (
    <>
      <div class="container-fluid content mt-4">
        <div class="row g-4">
          <div class="col-md-4">
            <div class="user-card">
              <h3>Comments</h3>
              <img src="" alt="" />
              <span>10</span>
            </div>
          </div>
          <div class="col-md-4">
            <div class="user-card">
              <h3>Pending Comments</h3>
              <span class="user-percent"></span>
              user bar
            </div>
          </div>
          <div class="col-md-4"></div>
          <h3>Posts</h3>
          <div class="col-md-6 d-flex align-items-center">
            <div class="adminsearchbar">
              <input type="text" class="adminsearchinput" placeholder="Search" />
              <i class="fa-solid fa-magnifying-glass"></i>
            </div>
          </div>
          <div class="col-md-6 text-md-end">
            <button class="btn btn-primary">Create Post</button>
          </div>
          <div class="col-12">
            <div class="scroller">
              <table>
                <thead>
                  <tr>
                    <th class="text-start checkbox">
                      <input type="checkbox" />
                      <i class="fa-solid fa-chevron-down checkboxarrow"></i>
                    </th>
                    <th colspan="8"></th>
                  </tr>
                  <tr class="row2">
                    <th> </th>
                    <th>
                      ID{" "}
                      <a href="">
                        <i class="fa-solid fa-sort"></i>
                      </a>
                    </th>
                    <th>Content</th>
                    <th>Author</th>
                    <th>
                      Publish Date{" "}
                      <a href="">
                        <i class="fa-solid fa-sort"></i>
                      </a>
                    </th>
                    <th>
                      Related Post{" "}
                      <a href="">
                        <i class="fa-solid fa-sort"></i>
                      </a>
                    </th>
                    <th>
                      Status{" "}
                      <a href="">
                        <i class="fa-solid fa-sort"></i>
                      </a>
                    </th>
                    <th class="text-center">Approve</th>
                    <th class="text-center">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="text-start">
                      <input type="checkbox" />
                    </td>
                    <td>1</td>
                    <td>Lorem ipsum...</td>
                    <td>New Author</td>
                    <td>20/20/2020 15:30</td>
                    <td>Post title</td>
                    <td>Published</td>
                    <td class="text-center">
                      <a href="edit-post.html">
                        <i class="fa-solid fa-check"></i>
                      </a>
                    </td>
                    <td class="text-center">
                      <a href="#">
                        <i class="fa-solid fa-trash-can red"></i>
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
