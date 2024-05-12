"use strict";

document.addEventListener("DOMContentLoaded", ()=>{
    const form = document.querySelector(".form");
    const input = document.querySelector("#inputField");

    form.addEventListener("submit", (e)=>{
        e.preventDefault();

        const inputValue = input.value;

        if (isNaN(new Date(inputValue).getTime())) {
            alert("Enter valid date");
            e.target.reset();
            return;
        }


        function zeroHandler(num){
            if(num >= 0 && num < 10){
                return `0${num}`;
            }
            return num;
        }
        
        function getTimeRamaining(endTime){
            const remaining = Date.parse(endTime) - Date.parse(new Date());
                
            const days = Math.floor(remaining / (1000 * 60 ** 2 * 24) % 30);
            const hours = Math.floor((remaining / (1000 * 60 ** 2)) % 24);
            const minutes = Math.floor((remaining / (1000 * 60)) % 60);
        
            return {
                "total": remaining,
                days,
                hours,
                minutes
            }
        }
        
        function setClock(endTime){
            const days = document.querySelector(".days");
            const hours = document.querySelector(".hours");
            const minutes = document.querySelector(".minutes");
        
            const timeObject = getTimeRamaining(endTime);
        
            const timerID = setInterval(updateClock, 1000);
        
            updateClock();
            function updateClock(){
                days.textContent = zeroHandler(timeObject.days);    
                hours.textContent = zeroHandler(timeObject.hours);
                minutes.textContent = zeroHandler(timeObject.minutes);
        
                if(timeObject.total <= 0){
                    clearInterval(timerID);
                    days.textContent = 0;    
                    hours.textContent = 0;
                    minutes.textContent = 0;
                    alert("Enter valid date");
                }
            }
        }

        setClock(inputValue);

        e.target.reset();   
    });

});