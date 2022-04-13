module.exports = (err, req, res, next) => {
  console.error('next:', err)
  console.error('name:', err.name)

  // if(err.code === '22P02'){
  //   return res.status(400).json({
  //     message: 'Error malformed ID'
  //   })
  // }
  // if(err.code === '23505'){
  //   return res.status(400).json({
  //     message: err.message
  //   })
  // }
  if(err.code === '22P02' || err.code === '23505'){
    return res.status(400).json({
      message: err.message
    })
  }
  if(err.name === 'Error'){
    return res.status(400).json({
      message: err.message
    })
  } else{
    return res.status(500).json({
      message: err.message
    })
  }
}
