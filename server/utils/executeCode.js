const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const util = require("util");

const executeCode = async (code, language, input) => {
  const fileId = Date.now();
  let filePath, command;

  if (language === "cpp") {
    filePath = path.join(__dirname, `${fileId}.cpp`);
    fs.writeFileSync(filePath, code);
    command = `g++ ${filePath} -o ${filePath}.out && echo "${input}" | ${filePath}.out`;
  } else if (language === "python") {
    filePath = path.join(__dirname, `${fileId}.py`);
    fs.writeFileSync(filePath, code);
    command = `echo "${input}" | python3 ${filePath}`;
  } else if (language === "java") {
    filePath = path.join(__dirname, `${fileId}.java`);
    fs.writeFileSync(filePath, code);
    command = `javac ${filePath} && echo "${input}" | java -cp ${__dirname} ${fileId}`;
  } else {
    throw new Error("Unsupported Language");
  }

  const execPromise = util.promisify(exec);

  try {
    const { stdout, stderr } = await execPromise(command);

    fs.unlinkSync(filePath);
    if (language === "cpp") fs.unlinkSync(`${filePath}.out`);
    if (language === "java") {
      fs.unlinkSync(filePath);
      fs.unlinkSync(`${__dirname}/${fileId}.class`);
    }

    if (stderr) {
      return { output: stderr };
    }

    return { output: stdout };
  } catch (err) {
    return { output: err.stderr || err.message };
  }
};

module.exports = executeCode;
