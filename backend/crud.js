const getUsersData = (req, res, db) => {
    db.select('*').from('usuarios')
      .then(items => {
        if(items.length){
          res.json(items)
        } else {
          res.json({dataExists: 'false'})
        }
      })
      .catch(err => res.status(400).json({dbError: 'db error'}))
  }
  
  const postUsersData = (req, res, db) => {
    const { id, nome, sobrenome, username, senha, salt } = req.body
    const added = new Date()
    db('usuarios').insert({id, nome, sobrenome, username, senha, salt, added})
      .returning('*')
      .then(item => {
        res.json(item)
      })
      .catch(err => res.status(400).json({dbError: 'db error'}))
  }
  
  const putUsersData = (req, res, db) => {
    const { id, nome, sobrenome, username, senha, salt } = req.body
    db('usuarios').where({id}).update({id, nome, sobrenome, username, senha, salt})
      .returning('*')
      .then(item => {
        res.json(item)
      })
      .catch(err => res.status(400).json({dbError: 'db error'}))
  }
  
  const deleteUsersData = (req, res, db) => {
    const { id } = req.body
    db('usuarios').where({id}).del()
      .then(() => {
        res.json({delete: 'true'})
      })
      .catch(err => res.status(400).json({dbError: 'db error'}))
  }
  
  module.exports = {
    getUsersData,
    postUsersData,
    putUsersData,
    deleteUsersData
  }