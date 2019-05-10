var express = require('express');
var router = express.Router();
const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog.js')
const { SuccessModel, ErrorModel } = require('../model/resModel.js')
const Checklogin = require('../middleware/Checklogin')

router.get('/list', function(req, res, next) {
  let author = req.query.author || ''
  let keyword = req.query.keyword || ''
  if(req.query.isadmin) {
      if(req.session.username == null) {
      //没有登录
          res.json(
            new ErrorModel('末登录')
          )
          return
      }
      author = req.session.username
  }
  const result = getList(author, keyword)
  return result.then(listdata => {
      res.json(
        new SuccessModel(listdata)
      )
  })
});

router.get('/detail', (req, res, next) => {
  const result = getDetail(req.query.id);
  return result.then(data => {
    res.json(
      new SuccessModel(data)
    )
  })
})

router.post('/new', Checklogin ,(req, res, next) => {
  req.body.author = req.session.username;
  const result = newBlog(req.body)
  return result.then(data => {
    res.json(
      new SuccessModel()
    )
  })
})

router.post('/del', Checklogin, (req, res, next) => {
  const author = req.session.username
  const result = delBlog(req.query.id, author)
  return result.then(value => {
    if(value) {
      res.json(
        new SuccessModel()
      )
      return
    }
    res.json(
      new ErrorModel('末登录')
    )
  })
})

router.post('/update', Checklogin, (req, res, next) => {
  const author = req.session.username
  const result = updateBlog(req.query.id, req.body)
  return result.then(value => {
    if(value) {
      res.json(
        new SuccessModel()
      )
      return
    }
    res.json(
      new ErrorModel('更新失败')
    )
  })
})
module.exports = router;
