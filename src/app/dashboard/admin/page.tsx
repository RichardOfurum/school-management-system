import Announcements from '@/components/Announcements'
import AttendanceChartContainer from '@/components/AttendanceChartContainer';
import CountChartContainer from '@/components/CountChartContainer'
import EventCalendarContainer from '@/components/EventCalendarContainer';


import UserCard from '@/components/UserCard'
import React from 'react';

const AdminPage = ({
    searchParams,
  }: {
    searchParams: { [keys: string]: string | undefined };
  }) => {
  return (
    <div className="p-4 gap-4 flex flex-col md:flex-row">
        {/* LEFT */}
        <div className="w-full lg:w-2/3 flex flex-col gap-8">
            {/* USER CARD  */}
            <div className="flex gap-4 justify-between flex-wrap">

                <UserCard type="admin"/>
                <UserCard type="student"/>
                <UserCard type="teacher"/>
                <UserCard type="parent"/>
              
            </div>
            {/*MIDDLE CHART */}
            <div className="flex gap-4 flex-col lg:flex-row">
                {/* count chart  */}
                <div className="w-full lg:w-1/3  h-[450px]">
                    <CountChartContainer/>
                </div>
                {/* attentance chart  */}
                <div className="w-full lg:w-2/3  h-[450px]">
                    <AttendanceChartContainer/>
                </div>
            </div>

            {/* BOTTOM CHART  */}

            {/* <div className="w-full h-[500px]">
                <FinanceChart />
                
            </div> */}
        </div>

        {/* RIGHT */}
        <div className="w-full lg:w-1/3 flex flex-col gap-8 ">
            <EventCalendarContainer searchParams={searchParams}/>
            <Announcements/>
        </div>
    </div>
  )
}

export default AdminPage
