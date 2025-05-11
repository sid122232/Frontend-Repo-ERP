import React from 'react'
import { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"




function SetEmployee() {
    const formSchema = z.object({
        username: z.string().min(2, {
          message: "Username must be at least 2 characters.",
        }),
      })

      const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "", name: "",
          age: "",
          email: "",
          phoneNumber: "",
          department: "",
          designation: "",
          skills:[
            {
                id: 'skill-1',
                skillName:"",
                proficiencyLevel:""
            }
        ],
        education:[
            {
              id: 'education-1',
                degree:"",
                institution:"",
                yearOfpassing:"",
                grade:""
            }

        ],
        workExperience:[
            {
              id: 'experience-1',
                company:"",
                position:"",
                years:""
            }
        ]
        },
      })
    
     
    const token = localStorage.getItem("token");

    const [submitMessage, setSubmitMessage]= useState("")
    // const [employees, setEmployee] = useState ({

    //     userName: "",
    //     name: "",
    //     age: "",
    //     email: "",
    //     phoneNumber: "",
    //     department: "",
    //     designation: "",
    //     skills:[
    //         {
    //             id: 'skill-1',
    //             skillName:"",
    //             proficiencyLevel:""
    //         }
    //     ],
    //     education:[
    //         {
    //           id: 'education-1',
    //             degree:"",
    //             institution:"",
    //             yearOfpassing:"",
    //             grade:""
    //         }

    //     ],
    //     workExperience:[
    //         {
    //           id: 'experience-1',
    //             company:"",
    //             position:"",
    //             years:""
    //         }
    //     ]
    // })
    // Handle changes for input fields

//     const handleChangeRequired = (e)=>{
// setEmployee({...employees, [e.target.name]:e.target.value})
//     }

    // Handle changes for array fields
    
// const handleArrayChanges =(index, event, field, arrayName)=>{
//  let updatedArray = [...employees[arrayName]];
//  updatedArray[index][field] = event.target.value;
//  setEmployee({...employees, [arrayName]: updatedArray}) 
// }

// add new entry to array
// const addNewEntry = (arrayName, newObject)=>{
//     setEmployee({...employees, [arrayName]: [...employees[arrayName],newObject]})

const { fields: skillFields, append: appendSkill, remove : removeSkill} = useFieldArray({
  control: form.control,
  name: "skills",
});

const { fields: educationFields, append: appendEducation , remove : removeEducation} = useFieldArray({
  control: form.control,
  name: "education",
});

const { fields: workFields, append: appendWork,remove : removeWorkExperience } = useFieldArray({
  control: form.control,
  name: "workExperience",
});



async function onSubmit(values){
    try {
        const response = await fetch("http://localhost:8080/employee", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(values)
          });
          
        if(response.ok){
           form.reset();
           setSubmitMessage("Your Form is submitted successfully")
           

        }

        
    } catch (error) {
        console.log("Error", error)
    }
  }
  return(
    <>
          <div className="border rounded-2xl shadow-2xl w-96 bg-white text-black mt-10 p-5">
          <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}  className="space-y-5"> 

          {["username", "name", "age", "email", "phoneNumber", "department", "designation"].map((fieldName) => (
            <div>


          <FormField
            key={fieldName}
            control={form.control}
            name={fieldName}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-base">{fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}</FormLabel>
                <FormControl>
                  <Input placeholder={`Enter ${fieldName}`} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />



            </div>


          
        ))}

        <div>
            <h3 className="font-bold text-base">Skills</h3>
            {skillFields.map((skill, index) => (
              <div key={skill.id} className="space-y-2">
                <FormField
                  control={form.control}
                  name={`skills.${index}.skillName`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Skill Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`skills.${index}.proficiencyLevel`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Proficiency Level" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                                <Button type="button" variant="destructive" onClick={() => removeSkill(index)}>Remove</Button>

              </div>
            ))}
            <Button type="button" onClick={() => appendSkill({ skillName: "", proficiencyLevel: "" })}>
              Add More Skill
            </Button>
         
          </div>



          <div>
            <h3 className="font-bold text-base mt-5">Work Experience</h3>
            {workFields.map((work, index) => (
              <div key={work.id} className="space-y-2">
                {["company", "position", "years"].map((field) => (
                  <FormField
                    key={field}
                    control={form.control}
                    name={`workExperience.${index}.${field}`}
                    render={({ field: subField }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder={field} {...subField} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
        
                 <Button type="button" variant="destructive" onClick={() => removeWorkExperience(index)}>Remove</Button>
              </div>
            ))}
            <Button type="button" onClick={() => appendWork({ company: "", position: "", years: "" })}>
              Add More Work Experience
            </Button>
          </div>
          <Button type="submit" className="w-full">Submit</Button>

{/* Submit message */}
{submitMessage && <p className="text-green-600">{submitMessage}</p>}
          </form> 
          
  
          
        

          
          
          





          </Form>
          </div>

    </>
  )
}

export default SetEmployee;


    




