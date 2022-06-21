import styles from "../styles/create.module.css";
import { Step, Stepper } from "react-form-stepper";
import { useState } from "react";
import { categories } from "../app/category";
import Image from "next/image";
import Button from "../app/components/button/Button";
import Input from "../app/components/input/Input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiSun, FiSunrise } from 'react-icons/fi';
import { GiSunset } from 'react-icons/gi';
import { MdNightsStay } from 'react-icons/md';
import axios from 'axios';
import Privet from '../app/components/privet/Privet'
import Meta from '../app/components/meta/Meta'
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Loader from '../app/components/loader/Loader'
import { useRouter } from "next/router";

const initialState = {
  title: "",
  description: "",
  price: 0,
  taskLength: "2-3 hours",
};


const taskTime = [
  {
    icon:<FiSunrise />,
    name:"Morning",
    smText:"Before 10AM"
  },
  {
    icon:<FiSun />,
    name:"Midday",
    smText:"10AM -2PM"
  },
  {
    icon:<GiSunset />,
    name:"Afternoon",
    smText:"2PM - 6PM"
  },
  {
    icon:<MdNightsStay />,
    name:"Evening",
    smText:"After 6PM"
  },
]

const repeatTask = ["Once", "Daily", "Mon to Fri", "Sat & Sun", "Weekly Custom"];

const Create = () => {
  const [goSteps, setGoSteps] = useState(0);
  const [fromData, setFormData] = useState(initialState);
  const [searchLocation, setSearchLocation] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [taskType, setTaskType] = useState("");
  const [whatTime, setWhatTime] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state?.user);
  const router = useRouter()
  const {
    title,
    description,
    price,
    taskLength
  } = fromData;
  const [category, setCategory] = useState("");

  const handleChange = (e) => {
    setFormData({ ...fromData, [e.target.name]: e.target.value });
  };

  const getLocation = async (e) => {
    e.preventDefault();
      try {
        const { data } = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchLocation}.json?access_token=${process.env.NEXT_PUBLIC_MAP_BOX_API_KEY}`);
        console.log(data?.features[0])
        setSearchLocation(data?.features[0]?.place_name)
      } catch (error) {
        console.log(error)
      }
  }


  const postData = {
    title,
    description,
    price,
    taskLength,
    category,
    address:searchLocation,
    taskType,
    endTime:startDate,
    whatTime
  }

  // console.log(postData)

  const handlePost = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/post/job`, postData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: true,
      });
      setLoading(false);
      toast.success("Task Created Successfully")
      router.push("/works")
    } catch (error) {
      setLoading(false);
        console.log(error);
        toast.error(error.response.data.message)
    }
  }

  return (
    <>
      <Privet>
        {loading ? <Loader /> : (
          <>
          <Meta title={`Help Some One Create Job`} />
      <section className={styles.create}>
        <div className="container">
          <div className={styles.row}>
            <Stepper activeColor="#ddd" activeStep={goSteps}>
              <Step
                onClick={() => setGoSteps(0)}
                label="Please choose a category"
              />
              <Step onClick={() => setGoSteps(1)} label="Fill the data" />
              <Step onClick={() => setGoSteps(2)} label="Post Job" />
            </Stepper>
            {goSteps === 0 && (
              <div className={styles.category}>
                <h1>Let's get some help by someone</h1>
                <div className={styles.flexBox}>
                  {categories.map(({ name, img }, index) => (
                    <div
                      className={styles.box}
                      key={index}
                      onClick={() => setCategory(name)}
                    >
                      <Image src={img} alt={name} width={50} height={50} />
                      <h4>{name}</h4>
                      <div
                        className={
                          category === name
                            ? `${styles.dot} ${styles.activeShow}`
                            : styles.dot
                        }
                      ></div>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    marginTop: "20px",
                  }}
                >
                  <Button
                    disabled={!category ? true : false}
                    onClick={() => setGoSteps(1)}
                    text="Next"
                    className="app_btn"
                    type="button"
                  />
                </div>
              </div>
            )}
            {goSteps === 1 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <form className={styles.otherInfo}>
                  <Input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={handleChange}
                    name="title"
                  />
                  <Input
                    type="number"
                    placeholder="Budget for the full work"
                    value={price}
                    onChange={handleChange}
                    name="price"
                  />
                  <textarea
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={handleChange}
                    name="description"
                    cols="30"
                    rows="10"
                  />
                  <Button
                    text="Next"
                    className="app_btn"
                    disabled={!title || !price || !description ? true : false}
                    onClick={() => setGoSteps(2)}
                  />
                </form>
              </div>
            )}
            {goSteps === 2 && (
              <div className={styles.locationAdd}>
                <div className={styles.locationHeader}>
                  <h1>Location / Address </h1>
                </div>
                <form className={styles.searchLocation} onSubmit={getLocation}>
                  <Input
                    type="text"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    name="searchLocation"
                  />
                  <Button className="app_btn" text="Add location" type='submit' />
                </form>
                <div className={styles.taskType}>
                  <h1>Repeat the work</h1>
                  <ul>
                    {repeatTask.map((item, index) => (
                    <li className={taskType === item ? styles.active : null} onClick={() => setTaskType(item)} key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className={styles.doneDate}>
                  <h1>When do you need it done?</h1>
                <DatePicker dateFormat="Pp" selected={startDate} onChange={(date) => setStartDate(date)} />
                </div>
                <div className={styles.taskTime}>
                    <h1>What time(s) do you need the Tasker?</h1>
                    <div className={styles.wrapper}>
                      {taskTime.map(({icon, name, smText}, index) => (
                        <div onClick={() => setWhatTime(name)} key={index} className={
                          whatTime === name
                            ? `${styles.taskCard} ${styles.taskCardActive}`
                            : styles.taskCard
                        }>
                            <h1>{icon}</h1>
                            <h2>{name}</h2>
                            <span>{smText}</span>
                          </div>
                      ))}
                    </div>
                </div>
                <Button style={{
                  marginTop:"20px"
                }} text="Submit" className="app_btn sm_btn" type="submit" onClick={handlePost} />
              </div>
            )}
          </div>
        </div>
      </section>
          </>
        )}
      </Privet>
    </>
  );
};

export default Create;
