const inquirer = require('inquirer')
const db = require('./database/connection')
const bcrypt = require('bcrypt')

async function signup() {
  const answers = await inquirer.prompt([
    {
      type: 'number',
      name: 'id',
      message: 'Enter your id:'
    },
    {
      type: 'input',
      name: 'email',
      message: 'Enter your email:'
    },
    {
      type: 'password',
      name: 'password',
      message: 'Enter your password:'
    }
  ])

  try {
    const hashedPassword = await bcrypt.hash(answers.password, 10)
    const query =
      'INSERT INTO users (employee_id, email, password) VALUES ($1, $2, $3)'
    const values = [answers.employee_id, answers.email, hashedPassword]
    await db.query(query, values)
    console.log('Signup successful!')
  } catch (err) {
    console.error(err)
  }
}
signup()
