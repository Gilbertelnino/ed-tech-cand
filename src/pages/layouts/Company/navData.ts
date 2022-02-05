export default [
  {
    name: "dashboard",
    tabs: [],
  },
  {
    name: "candidates",
    tabs: ["All", "Favorite", "Qualified", "Contacted", "Screening", "Interviewed", "Hired", "Rejected"],
    action: [{ title: "search" }]
  },
  {
    name: "jobs",
    tabs: ["All", "Archive", "Drafts"],
    action: [
      {
        title: "Add New",
        icon: "Add",
        type: "contained"
      },
      {
        title: "View Drafts",
        icon: "File",
        type: "outlined"
      },
      {
        title: "search",
      },
    ]
  },
  {
    name: "page",
    tabs: ["Home", "People", "Jobs", "News", "Events"],
    action: [
      {
        title: "Preview",
      },
      {
        title: "Publish",
        icon: "Publish",
        type: "contained"
      },
      {
        title: "Save",
        icon: "Save",
        type: "outlined"
      }
    ]
  },
  {
    name: "admins",
    tabs: ["All"],
    action: [
      {
        title: "New",
        icon: "Add",
        type: "contained"
      },
      {
        title: "search",
      },
    ]
  },
  {
    name: "messages",
    tabs: [],
    action: [
      // {
      //   title: "New",
      //   icon: "Add",
      //   type: "contained"
      // },
      // {
      //   title: "Manage",
      //   icon: "Edit",
      //   type: "outlined"
      // },
      // {
      //   title: "search",
      // },
    ]
  },
  // {
  //   name: "settings",
  //   tabs: [],
  // },
];
