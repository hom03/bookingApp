import express from "express";
import User from "../models/User.js"

const router = express.Router();


router.post("/submit-form", async (req,res)=>{
    const {name,email,phone_no,date,card_no,card_date,cvv} = req.body
     const newUser = new User({
          name,
          email,
          phone_no,
          date,
          card_no,
          card_date,
          cvv
     })
     newUser.save()
     .then(()=>{
          const saveConfirm ="<p>Data saved to MongoDB.</p><a href='/'>Go back to Home</a>";
         res.send(saveConfirm);
     })
     .catch((error)=> {
          console.error(error)
          const saveError = "<p>Error saving data to MongoDB.</p><a href='/'>Go back to Home</a>";
          res.status(500).send(saveError);
     })
});
router.get('/', async (req,res)=>{
    try{
         const Users = await User.find();
         res.render('userList.ejs', {users: Users});
    }catch(error){
         res.status(500).send("Error retrieving data from MongoDB");
    }
});
router.get('/del', async (req,res)=>{
     try{
          const Users = await User.find();
          console.log(Users)
          res.render('deleteBookings.ejs', {users: Users});
     }catch(error){
          res.status(500).send("Error retrieving data from MongoDB");
     }
 });
router.post('/users/del', async (req,res)=> {
     const{selectedUser} = req.body;
     try{
          await User.findOneAndDelete({name: selectedUser});
          console.log('Deleting User:', selectedUser);
          res.redirect('users/del');
     }catch(error){
          res.status(500).send("Error deleting data from MongoDB.");
     }
});
router.get('/modify', async (req, res) => {
     try {
         const users = await User.find();
         console.log(users);
         res.render('modifyBookings.ejs', {users: users || [] });
     } catch (error) {
         res.status(500).send("Error retrieving data from MongoDB");
     }
 });
 
 router.post('/modify/:userId', async (req, res) => {
     const userId = req.params.userId;
     const {name, email, phone_no, date, card_no, card_date, cvv} = req.body;
 
     try {
         const updatedUser = await User.findByIdAndUpdate(
             userId,
             {name, email, phone_no, date, card_no, card_date, cvv},
             {new: true}
         );
         console.log('Updating User:', updatedUser);
         res.redirect('/users/modify');
     } catch (error) {
         res.status(500).send("Error updating data in MongoDB.");
     }
 });
export default router