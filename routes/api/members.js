const express = require("express");
const router = express.Router();
const members = require("../../Members");
const uuid = require("uuid");

//get all members
router.get("/", (req, res) => {
  //use router instead of app
  res.json(members); //no need to even strigify
});

//get single member
router.get("/:id", (req, res) => {
  //:id is url parameter
  const found = members.some((member) => member.id === parseInt(req.params.id)); //normal js method
  if (found) {
    res.json(members.filter((member) => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `Member ${req.params.id} not found` });
  }
});

//create member
router.post("/", (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
  };

  if (!newMember.name) {
    //either return or specify else or we get error saying header already sent
    return res.status(400).json({ msg: "name field missing" });
  }
  members.push(newMember);
  // res.json(members);
  res.redirect("/");
});

//update member
router.put("/:id", (req, res) => {
  //:id is url parameter
  const found = members.some((member) => member.id === parseInt(req.params.id)); //normal js method
  if (found) {
    const updateMember = req.body;
    members.forEach((member) => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updateMember.name ? updateMember.name : member.name;
        res.json({ msg: "member updated", member });
      }
    });
  } else {
    res.status(400).json({ msg: `Member ${req.params.id} not found` });
  }
});

//delete member
router.delete("/:id", (req, res) => {
  //:id is url parameter
  const found = members.some((member) => member.id === parseInt(req.params.id)); //normal js method
  if (found) {
    res.json({
      msg: "member deleted",
      member: members.filter((member) => member.id !== parseInt(req.params.id)),
    });
  } else {
    res.status(400).json({ msg: `Member ${req.params.id} not found` });
  }
});

module.exports = router;
