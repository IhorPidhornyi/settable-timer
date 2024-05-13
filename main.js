"use strict";

document.addEventListener("DOMContentLoaded", ()=>{
    const form = document.querySelector(".form");
    const input = document.querySelector("#inputField");

    function zeroHandler(num){
        if(num >= 0 && num < 10){
            return `0${num}`;
        }
        return num;
    }
    
    function getTimeRamaining(endTime = 0){
        let days, hours, minutes, seconds;
        const remaining = new Date(endTime).getTime() - Date.now();
    
        if(remaining <= 0){
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else{
            days = Math.floor(remaining / (1000 * 60 * 60 * 24));
            hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
            seconds = Math.floor((remaining % (1000 * 60)) / 1000);
        }
    
        return {
            "total": remaining,
            days,
            hours,
            minutes,
            seconds
        };
    }
    
    
    function setClock(endTime = 0){
        const days = document.querySelector(".days");
        const hours = document.querySelector(".hours");
        const minutes = document.querySelector(".minutes");
        const seconds = document.querySelector(".seconds");
    
        function updateClock(){
            const timeObject = getTimeRamaining(endTime);
            days.textContent = zeroHandler(timeObject.days);    
            hours.textContent = zeroHandler(timeObject.hours);
            minutes.textContent = zeroHandler(timeObject.minutes);
            seconds.textContent = zeroHandler(timeObject.seconds);
    
            if(timeObject.total <= 0){
                clearInterval(timerID);
                days.textContent = 0;
                hours.textContent = 0;
                minutes.textContent = 0;
                seconds.textContent = 0;
            }
        }
    
        const timerID = setInterval(updateClock, 1000);
        updateClock();
    }
    

    form.addEventListener("submit", (e)=>{
        e.preventDefault();

        const inputValue = input.value;

        if (isNaN(new Date(inputValue).getTime())) {
            alert("Enter valid date");
            e.target.reset();
            return;
        }

        setClock(inputValue);

        e.target.reset();
    });

});