import logo from './logo.svg';
import './App.css';
import NavBar from "./component/nav_bar/NavBar";
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
//const {loadPyodide} = window.pyodide;
import { usePython, PythonProvider } from 'react-py'
//import { PythonProvider } from 'react-py'
import React, { useState } from 'react';
let  editorContent= "import builtins\n" +
    "\n" +
    "def new_input():\n" +
    "    return \"10\"\n" +
    "\n" +
    "builtins.input = new_input\n";







function App() {
    const { runPython, stdout, stderr, isLoading, isRunning } = usePython()

    /*
    globalThis.loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/dev/full/'
        })
    async function hello_python() {
        let pyodide = await loadPyodide({
            indexURL: "<pyodide artifacts folder>",
        });
        return pyodide.runPythonAsync("1+1");
    }

    hello_python().then((result) => {
        console.log("Python says that 1+1 =", result);
    });


*/
    const handleCodeEditor = (value) =>{


        editorContent = value;




    }
    function handlePython(){
        runPython(editorContent).then(r => {
            console.log(stdout);
        });

    }

  return (
    <div className="App">
        <PythonProvider>
            <NavBar></NavBar>
            <Editor  className="Editor" height="60vh" fontSize="20" width="60vw" defaultLanguage="python" theme='vs-dark'
               defaultValue={editorContent} onChange={handleCodeEditor}/>
           <button onClick={handlePython}>Run</button>
        </PythonProvider>
    </div>


  );
}

export default App;
