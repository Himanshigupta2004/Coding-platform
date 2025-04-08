const db = require('../database/sql_db');

const addCustomQuestion = async (req, res) => {
  const { title, description, constraints, sampleInput, sampleOutput, hiddenInput, hiddenOutput,difficulty } = req.body;

  try {
    await db.query(
      'INSERT INTO custom_questions (title, description, constraints, sample_input, sample_output, hidden_input, hidden_output,difficulty) VALUES (?, ?, ?, ?, ?, ?, ?,?)',
      [title, description, constraints, sampleInput, sampleOutput, hiddenInput, hiddenOutput,difficulty]
    );

    res.json({ message: 'Question Added Successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error while adding question' });
  }
};
const getAllCustomQuestions = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM custom_questions');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching questions' });
  }
};

const getQuestionById=async(req,res)=>{
  const {id}=req.params;
  if(!id){
    return res.status(400).json({error:"ID is required"});
  }
  try{
    const [rows]= await db.query('SELECT * FROM custom_questions WHERE id=?' ,[id]);
    if(rows.length===0){
      return res.status(404).json({error:"Question not found"});
    }
    res.json(rows[0]);
  }
  catch(err){
    console.error(err);
    res.status(500).json({error:"Error fetching question"});
  }
}

module.exports = { addCustomQuestion ,getAllCustomQuestions,getQuestionById};
