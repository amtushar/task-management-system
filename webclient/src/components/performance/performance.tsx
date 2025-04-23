"use client";
import { RootState } from "@/redux/store/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Progress } from "antd"; // Ant Design Progress component
import taskApi from "@/api/task/taskApi";
import Image from 'next/image';


const Performance = () => {
  const [targetEfficiency, setTargetEfficiency] = useState<number>(0);
  const [animatedEfficiency, setAnimatedEfficiency] = useState<number>(0);
  const [isApiCalled, setIsApiCalled] = useState<boolean>(false);

  const user = useSelector((state: RootState) => state?.user); 
  const myGif = "https://task-management-system-7crt.vercel.app/loader.gif";
  const TaskApi = new taskApi();

  
  useEffect(() => {
    const fetchEfficiency = async () => {
      if (user?.userID && !isApiCalled) {
        console.log("Fetching efficiency for user:", user);

        const filter = {
          userID: user.userID,
          taskDone: user.taskDone,
          permission: 'performance'
        };

        try {
          const output = await TaskApi.FindEfficiency(filter);
          console.log("API Output:", output);
          setTargetEfficiency(output.output.outputResponse.efficiency || 0);
          setIsApiCalled(true); 
        } catch (error) {
          console.error("Error fetching efficiency:", error);
        }
      }
    };

    fetchEfficiency();
  }, [user, isApiCalled, TaskApi]);


  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      if (progress < targetEfficiency) {
        progress += 1;
        setAnimatedEfficiency(progress);
      } else {
        clearInterval(interval);
      }
    }, 20); 
    return () => clearInterval(interval);
  }, [targetEfficiency]);

  // Render
  return (
    <div style={{ textAlign: "center", marginTop: "3rem" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1.5rem" }}>
        Performance Indicator
      </h1>
      {user.userRole? user?.userRole === "member" ? (
        <div style={{ display: "inline-block", position: "relative" }}>
          <Progress
            type="circle"
            percent={animatedEfficiency} 
            strokeColor={
              animatedEfficiency <= 40
                ? "#ff4d4f" // Red for <= 40%
                : animatedEfficiency <= 70
                ? "#faad14" // Yellow for <= 70%
                : "#52c41a" // Green for > 70%
            }
            size={250} 
            strokeWidth={16}
          />
        </div>
      ) : (
        <p style={{ fontSize: "1.2rem", color: "#888" }}>
          This section is not available for your role.
        </p>
      ):(
        <div className='flex items-center justify-center bg-white dark:bg-navy-700 h-[100vh] -mt-48' >
      <Image src={myGif} alt="my gif" height={80} width={80} />
    </div>
      ) }
    </div>
  );
};

export default Performance;
