const { pool } = require("../db");

const isPremium = async (req, res, next) => {

const user = res.locals.user;
 try {
  if (user.isPremium){
    res.locals.isPremium =true;
  }
else{
   res.locals.isPremium = false;
}   next();
 }
 catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }

};


module.exports = {
  isPremium,
};
