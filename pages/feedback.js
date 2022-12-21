import Link from 'next/link';
import clientPromise from "../lib/mongodb";
import React, { useState } from "react";
let loadedOnce = false;
let AssSetArr = [];
let assignList = [];
let opgList = [];
let niceString = [];

export default function Opgaver({ feedbacks, assSets, assignments }) {

    const [toggle, setToggle] = useState(true);

    function MakeClasses() {
        let classes = [];
        for (let i = 0; i < assSets.length; i++) {
            if (classes.includes(assSets[i].assClass) == false)
                classes.push(assSets[i].assClass);
        }
        console.log(classes);
        return classes;
    }
    function MakeAssSetThroughClass() {
        if (loadedOnce == false) {
            assSets.map((assSet) => (
                AssSetArr.push(assSet)
            ))
            loadedOnce = true;
        }

        else if (loadedOnce == true) {
            AssSetArr = [];
            const classInput = document.getElementById("class").value;
            for (let i = 0; i < assSets.length; i++) {
                if (assSets[i].assClass == classInput)
                    AssSetArr.push(assSets[i]);
            }
        }
        console.log(AssSetArr);
        return AssSetArr;
    }


    async function GetAssignments() {
        assignList = [];
        opgList = [];

        const assSet_id = assSets.find(a => a.name == document.getElementById("assName").value)._id;
        console.log(assSet_id);
        for (let i = 0; i < feedbacks.length; i++) {

            if (assSet_id == feedbacks[i].assSetID) {

                assignList.push(feedbacks[i]);
            }
        }
        for (let i = 0; i < assignments.length; i++) {
            if (assSet_id == assignments[i].assSetID) {

                opgList.push(assignments[i].assignmentText);
            }
        }

        console.log(feedbacks);
        console.log(assignList)
        console.log(toggle);
        setToggle(prevState => !prevState)
        makeNiceStringList();
    }

    function makeNiceStringList() {
        niceString = [];
        let stringOfCorr = "";
        let howLong = assignList[0].listOfCorr.split(",").length;
        let someFancyArr = []
        let theFancyInt = 0;

        for (let j = 0; j < assignList.length; j++) {
            let feedback = assignList[j];
            for (let i = 0; i < howLong; i++) {
                theFancyInt = parseInt(feedback.listOfCorr.split(",")[i])
                if (j == 0) {
                    someFancyArr[i] = theFancyInt;
                } else if (j > 0){
                    someFancyArr[i] += theFancyInt;
                }
            }
        }
        for (let i = 0; i < howLong; i++) {
            niceString.push(someFancyArr[i] + " ud af " + assignList.length + " elever fik opgave " +  (i + 1) + " korrekt.\n" + "Spørgsmålet var: " + opgList[i] + "\n");
        }


        console.log("Nice string: " + niceString)
    }


    return (

        <div>

            <h1>Awesome Evaluering Af Opgave Sæt</h1>
            <p>
                <small>(Ifølge Freya Wad Sackett)</small>
            </p>

            <label for="class">Vælg en Klasse: </label>
            <select name="class" id="class">
                {MakeClasses().map((className) => (
                    <option value={className}>{className}</option>
                ))}
            </select>
            <br></br>
            <label for="assName">Vælg et Opgavesæt: </label>
            <select name="assName" id="assName">
                {MakeAssSetThroughClass().map((assSet) => (
                    <option value={assSet.name}>{assSet.name}</option>
                ))}
            </select>

            <div >
                <div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <button onClick={GetAssignments}>Få Resultater fra Opgavesæt</button>
                    {toggle ? (
                        niceString.map((feedback) => (
                            <>
                                <div id="ass">
                                    <h2>{feedback}</h2>
                                </div>
                            </>
                        ))

                    ) : null}


                </div>
            </div>

            <style jsx>{`
            #ass {
                display: flex;
                flex-direction: column;
                }
            #ass > div {
                margin-bottom: 100px;
                margin-left: 10px;
            }
            `
            }
            </style>
        </div>

    );
}


export async function getServerSideProps() {
    try {
        const client = await clientPromise;
        const db = client.db("test");

        const assSets = await db
            .collection("asssets")
            .find({})
            .sort({})
            .limit(20)
            .toArray();

        const feedbacks = await db
            .collection("feedbacks")
            .find({})
            .sort({})
            .limit(20)
            .toArray();

        const assignments = await db
            .collection("singles")
            .find({})
            .sort({})
            .limit(20)
            .toArray();

        return {
            props: { feedbacks: JSON.parse(JSON.stringify(feedbacks)), assSets: JSON.parse(JSON.stringify(assSets)), assignments: JSON.parse(JSON.stringify(assignments)) },
        };

    }
    catch (e) {
        console.error(e);
    }
}

/*



*/