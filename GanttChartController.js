({
    doInit : function(component, event, helper) {
        helper.intitate(component, event, helper);
        helper.changeHeight(component, event, helper);
        helper.spaceFamily(component, event, helper);
    },
    
    selectedMonth : function(component,event,helper){
        helper.yearMonthChange(component,event,helper);
    },
   
    selectedYear : function(component,event,helper){
        helper.isAtribute(component, event, helper);
     
        let isDayFilter = component.get('v.isDayFilter');
        if(isDayFilter){
		            
        }else{
            var month = component.get('v.statusMonth');
            var numOfDay = [];
            var weekday = new Array(7);
            weekday[0] = "SUN";
            weekday[1] = "MON";
            weekday[2] = "TUE";
            weekday[3] = "WED";
            weekday[4] = "THU";
            weekday[5] = "FRI";
            weekday[6] = "SAT";
            var year = component.find("year").get("v.value");
            var d = new Date(year, month-1, 1);
            var n = weekday[d.getDay()];
            var m = d.getDay();
            let days = helper.getDayInMonth(month, year);
             var week = component.find("week").get("v.value");
            
            if(week == 8){
                component.set("v.previousShowMonthButton",false);
                component.set("v.nextShowMonthButton",false);
                component.set('v.previousShowButton', true);
                component.set('v.nextShowButton', true);
                component.set('v.showButton', true);
            for (var i = 1; i<=week; i++) {
                var res = weekday[((m-1) + i) % 7]+' ';
                numOfDay.push({res, i});
            }
              component.set("v.numOfDays",numOfDay);
            }else if(week == 16){
                component.set("v.previousShowMonthButton",false);
                component.set("v.nextShowMonthButton",false);
                component.set('v.previousShowButton', true);
                component.set('v.nextShowButton', true);
                component.set('v.showButton', true);
            for (var i = 9; i<=week; i++) {
                var res = weekday[((m-1) + i) % 7]+' ';
                numOfDay.push({res,i}); 
            }
              component.set("v.numOfDays",numOfDay);
            } 
            else if(week == 24){
                component.set("v.previousShowMonthButton",false);
                component.set("v.nextShowMonthButton",false);
                component.set('v.previousShowButton', true);
                component.set('v.showButton', true);
                component.set('v.nextShowButton', true);
            for (var i = 17; i<=week; i++) {
                var res = weekday[((m-1) + i) % 7]+' ';
                numOfDay.push({res,i});
            }
               component.set("v.numOfDays",numOfDay);
            } 
            else if(week == 31){
                component.set("v.previousShowMonthButton",false);
                component.set("v.nextShowMonthButton",false);
                component.set('v.previousShowButton', true);
                component.set('v.showButton', true);
                component.set('v.nextShowButton', true);
            
            for (var i = 25; i<=days; i++) {
                var res = weekday[((m-1) + i) % 7]+' ';
                numOfDay.push({res,i});
            }
               component.set("v.numOfDays",numOfDay);
            }
              else{
                component.set('v.previousShowButton', false);
                component.set('v.nextShowButton', false);
            if(month == 1){
            	component.set("v.previousShowMonthButton",false); 
            }else{
            	component.set("v.previousShowMonthButton",true); 
            }
            if(month == 12){
            	component.set("v.nextShowMonthButton",false);
            }else{
            	component.set("v.nextShowMonthButton",true);
            }
            
            for (var i = 1; i<=days; i++) {
                var res = weekday[((m-1) + i) % 7]+' ';
                numOfDay.push({res,i});
            }
              component.set("v.numOfDays",numOfDay);
            }
            for (var i = 1; i<=days; i++) {
                var res = weekday[((m-1) + i) % 7]+' ';
                numOfDay.push({res,i});  
                              			}
                               
               component.set("v.numOfHours",numOfDay);
                              
        }
        helper.spaceFamily(component, event, helper);
                               var expandButton =  component.find('expandAndCollapse');
                               expandButton.set("v.value", 'collapseall');
                               expandButton.set("v.label", 'Collapse All');
                               component.set("v.isCollapse", false);
    },
   
    toggleFamily: function(component,event,helper){
        helper.isToggle(component,event,helper);
        
        setTimeout(() => {
            
            var items = component.get("v.spaceFamily"), index = event.getSource().get("v.value");
            var res = index.split(":");
            var FaIndex = res[0];
            items[FaIndex].expanded = !items[FaIndex].expanded;
            component.set("v.spaceFamily", items);
            component.set('v.isSpinnerOpen', false);
        }, 500);
    },
                               
    toggleSpaces: function(component,event,helper){
         helper.isToggle(component,event,helper);
        
        setTimeout(() => {
            var items = component.get("v.spaceFamily"), index = event.getSource().get("v.value");
            var res = index.split(":");
            var FaIndex = res[0];
            var FmIndex = res[1];
            items[FaIndex].spaceList[FmIndex].expanded = !(items[FaIndex].spaceList[FmIndex].expanded);
            component.set("v.spaceFamily", items);
            component.set('v.isSpinnerOpen', false);
        }, 500);
    },
    selectedWeek : function(component,event,helper){
        helper.spaceFamily(component, event, helper);
        helper.isAtribute(component, event, helper);
        component.set('v.selectedDay', 'AllDays');

        var month = component.find("month").get("v.value");
        var year = component.find("year").get("v.value");
        var week = component.find("week").get("v.value");
        component.set('v.statusWeek', parseInt(week));
        var numOfDay = [];
        var curr = new Date;
        var todayMonth = curr.getMonth();
        var todayYear = curr.getFullYear();
        
        var weekday = new Array(7);
        weekday[0] = "SUN";
        weekday[1] = "MON";
        weekday[2] = "TUE";
        weekday[3] = "WED";
        weekday[4] = "THU";
        weekday[5] = "FRI";
        weekday[6] = "SAT";
        
        var d = new Date(year, month-1, 1);
        var n = weekday[d.getDay()];
        var m = d.getDay();
        
        var getDaysInMonth = function(month,year) {
            return new Date(year, month, 0).getDate();
        };
        var days = getDaysInMonth(month, year);
        days = helper.getDayInMonth(month, year)
       
        const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
                            "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
                           ];
        
        var todayMonthName = monthNames[month-1];
        component.set('v.getmonthName',todayMonthName);
        

        if(week == 8){
            component.set("v.previousShowMonthButton",false);
            component.set("v.nextShowMonthButton",false);
            component.set('v.previousShowButton', true);
            component.set('v.nextShowButton', true);
             component.set('v.showButton', true);
            for (var i = 1; i<=week; i++) {
                var res = weekday[((m-1) + i) % 7]+' ';
                numOfDay.push({res, i});
            }
            }else if(week == 16){
                component.set("v.previousShowMonthButton",false);
                component.set("v.nextShowMonthButton",false);
                component.set('v.previousShowButton', true);
                component.set('v.nextShowButton', true);
                component.set('v.showButton', true);
            for (var i = 9; i<=week; i++) {
            var res = weekday[((m-1) + i) % 7]+' ';
            numOfDay.push({res,i}); 
            }
            } 
            else if(week == 24){
                component.set("v.previousShowMonthButton",false);
                component.set("v.nextShowMonthButton",false);
                component.set('v.previousShowButton', true);
                component.set('v.showButton', true);
                component.set('v.nextShowButton', true);
            for (var i = 17; i<=week; i++) {
                var res = weekday[((m-1) + i) % 7]+' ';
                numOfDay.push({res,i});
            }
            } 
            else if(week == 31){
                component.set("v.previousShowMonthButton",false);
                component.set("v.nextShowMonthButton",false);
                component.set('v.previousShowButton', true);
                 component.set('v.showButton', true);
                component.set('v.nextShowButton', true);
            
            for (var i = 25; i<=days; i++) {
                var res = weekday[((m-1) + i) % 7]+' ';
                numOfDay.push({res,i});
            }
            }else{
                component.set('v.previousShowButton', false);
                component.set('v.nextShowButton', false);
            if(month == 1){
            	component.set("v.previousShowMonthButton",false); 
            }else{
            	component.set("v.previousShowMonthButton",true); 
            }
            if(month == 12){
            	component.set("v.nextShowMonthButton",false);
            }else{
            	component.set("v.nextShowMonthButton",true);
            }
            
            for (var i = 1; i<=days; i++) {
                var res = weekday[((m-1) + i) % 7]+' ';
                numOfDay.push({res,i});
            }
            }
        	helper.spaceFamilyOnChangeWeek(component, event, helper, numOfDay, week);
    },
    handleToday:function(component, event, helper){
        component.set('v.isFirstTime', true);
        //component.set('v.spaceFamilyLimit', $A.get("$Label.c.Space_Family_Limit"));
        component.set('v.spaceFamilyLimit', 5);
        var curr = new Date;
        var todayDate = curr.getDate();
        const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
                            "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
                           ];
        
        var todayMonthName = monthNames[curr.getMonth()];
        component.set('v.getmonthName',todayMonthName);

        component.set('v.statusMonth', (curr.getMonth() +1));
        if(todayDate >= 1 && todayDate <= 8){
            component.find("week").set("v.value", "8");
        }else if(todayDate >= 9 && todayDate <= 16){
            component.find("week").set("v.value", "16");
        }else if(todayDate >= 17 && todayDate <= 24){
            component.find("week").set("v.value", "24");
        }else {
            component.find("week").set("v.value", "31");
        }
        var a = component.get('c.selectedWeek');
        a.setParams({
            "component": component,
            "event": event,
            "helper" : helper
        });
        $A.enqueueAction(a);
    },
    
    previousMonth:function(component, event, helper) {
        component.set('v.isFirstTime', true);
        component.set('v.spaceFamilyLimit', 5);
        component.set('v.isSpinnerOpen', true);
        let isDaySelected = component.get('v.isDayFilter');
        if(isDaySelected){
            let selectedDay = parseInt(component.get('v.selectedDay'));
            if(selectedDay > 1){
                component.set('v.selectedDay', --selectedDay);
            }else{
                var month = component.find("month").get("v.value");  
                if(month == 2){
                    var previousMonth = 1;  
                }else if(month > 2){
                    var previousMonth = --month; 
                }
                if(month == 1){
                    var previousMonth = 12;  
                    var seletctedYear = component.get('v.statusYear');
                    seletctedYear = parseInt(seletctedYear) - 1;
                    component.set('v.statusYear', seletctedYear);
                }
                if(previousMonth == 12){
                }else{
                component.set("v.nextShowMonthButton",true);
                }
            
                if(previousMonth == 1){
                }else{
                    component.set('v.previousShowMonthButton',true);  
                }
                let selectedYear = component.get('V.statusYear');
                component.set('v.selectedDay', helper.getDayInMonth(previousMonth, selectedYear));
                component.find("month").set("v.value",previousMonth);
                component.set('v.statusMonth', previousMonth);
            }
            
        }else{
            var month = component.find("month").get("v.value");  
            if(month == 2){
                var previousMonth = 1;  
            }else if(month > 2){
                var previousMonth = --month; 
            }
            if(month == 1){
                var previousMonth = 12;  
                var seletctedYear = component.get('v.statusYear');
                seletctedYear = parseInt(seletctedYear) - 1;
                component.set('v.statusYear', seletctedYear);
            }
            if(previousMonth == 12){
            }else{
            component.set("v.nextShowMonthButton",true);
            }
        
            if(previousMonth == 1){
            }else{
                component.set('v.previousShowMonthButton',true);  
            }
        
            component.find("month").set("v.value",previousMonth);
            component.set('v.statusMonth', previousMonth);
        }
        helper.spaceFamily(component, event, helper);
        helper.yearMonthChange(component,event,helper);
    },
    nextMonth:function(component, event, helper) {
         helper.isAtribute(component, event, helper);

        component.set('v.selectedDay', 'AllDays');
        var Totaldays = component.get("v.numOfDays");
        var month = component.find("month").get("v.value");
        var nextMonth = month;
        let isDaySelected = component.get('v.isDayFilter');
        if(isDaySelected){
            let selectedDay = parseInt(component.get('v.selectedDay'));
            let selectedYear = component.get('V.statusYear');
            let monthLastDay = helper.getDayInMonth(month, selectedYear);
            if(selectedDay < monthLastDay){
                component.set('v.selectedDay', ++selectedDay);
            }else if(selectedDay == monthLastDay){
                component.set('v.selectedDay', '1');
                if(month == 11){
                    nextMonth = 12;  
                }else if(month < 12){
                    nextMonth = ++month;
                }else{
                    nextMonth = 1;
                    var seletctedYear = component.get('v.statusYear');
                    seletctedYear = parseInt(seletctedYear) + 1;
                    component.set('v.statusYear', seletctedYear);
                    
                }
                if(nextMonth == 12){
                }else{
                    component.set("v.nextShowMonthButton",true);
                }
                
                if(nextMonth == 1){
                }else{
                    component.set('v.previousShowMonthButton',true);  
                }
                
            }
        }else{
            if(month == 11){
                nextMonth = 12;  
            }else if(month < 12){
                nextMonth = ++month;
            }else{
                nextMonth = 1;
                var seletctedYear = component.get('v.statusYear');
                seletctedYear = parseInt(seletctedYear) + 1;
                component.set('v.statusYear', seletctedYear);
                
            }
            if(nextMonth == 12){
            }else{
                component.set("v.nextShowMonthButton",true);
            }
            
            if(nextMonth == 1){
            }else{
                component.set('v.previousShowMonthButton',true);  
            }
        }
        
        component.find("month").set("v.value",nextMonth);
        component.set('v.statusMonth', nextMonth);
        helper.spaceFamily(component, event, helper);
        helper.yearMonthChange(component,event,helper);
    },
    nextWeek:  function(component,event,helper){
        component.set('v.isFirstTime', true);
        component.set('v.spaceFamilyLimit', 5);
        component.set('v.isSpinnerOpen', true);
        var week = component.find("week").get("v.value"); 
        
        if(week == '8'){
            component.set("v.previousShowMonthButton",false);
            component.find("week").set("v.value", "16");
        }else if(week == '16'){
            component.set("v.previousShowMonthButton",false);
            component.find("week").set("v.value", "24");
        }else if(week == '24'){
            component.set("v.previousShowMonthButton",false);
            component.find("week").set("v.value", "31");
        }else{
            var month = component.find("month").get("v.value");  
            if(month == 11){
                var nextMonth = 12;  
            }else if(month < 12){
                var nextMonth = ++month;
            }else{
                var nextMonth = 1;
                var seletctedYear = component.get('v.statusYear');
                seletctedYear = parseInt(seletctedYear) + 1;
                component.set('v.statusYear', seletctedYear);
            }
            try{
                var numOfDay  = [];
                var weekday = new Array(7);
                weekday[0] = "SUN";
                weekday[1] = "MON";
                weekday[2] = "TUE";
                weekday[3] = "WED";
                weekday[4] = "THU";
                weekday[5] = "FRI";
                weekday[6] = "SAT";
                var seletctedYear = component.get('v.statusYear');
                seletctedYear = parseInt(seletctedYear);
                
                var d = new Date(seletctedYear, nextMonth, 1);
                var n = weekday[d.getDay()];
                var m = d.getDay();
                
               var days = helper.getDayInMonth(nextMonth, seletctedYear);
                var numofHr = [];
                for (var i = 1; i<=8; i++) {
                    var res = weekday[((m-1) + i) % 7]+' ';
                    numOfDay.push({res,i});  
                                  }
                                   
                                   for (var i = 1; i<=days; i++) {
                                   var res = weekday[((m-1) + i) % 7]+' ';
                                   numofHr.push({res,i});  
                                  }
                                   component.set('v.numOfHours', numofHr);
                                  }catch(err){
                                   console.log(err.message);
                                  }
            
            component.set('v.numOfDays', numOfDay);
            component.find("month").set("v.value",nextMonth);
            component.set('v.statusMonth', nextMonth);
            component.find("week").set("v.value", "8");
        }
        var a = component.get('c.selectedWeek');
        a.setParams({
            "component": component,
            "event": event,
            "helper" : helper
        });
        $A.enqueueAction(a);
    }, 
    previousWeek:  function(component,event,helper){
        component.set('v.isFirstTime', true);
        component.set('v.spaceFamilyLimit', 5);
        component.set('v.isSpinnerOpen', true);
        var week = component.find("week").get("v.value"); 
        if(week == '16'){
            component.set("v.previousShowMonthButton",false);
            component.find("week").set("v.value", "8");
        }else if(week == '24'){
            component.set("v.previousShowMonthButton",false);
            component.find("week").set("v.value", "16");
        }else if(week == '31'){
            component.set("v.previousShowMonthButton",false);
            component.find("week").set("v.value", "24");
        }else{
            var month = component.find("month").get("v.value");  
            if(month == 1){
                var nextMonth = 12; 
                  
                var seletctedYear = component.get('v.statusYear');
                seletctedYear = parseInt(seletctedYear) - 1;
                component.set('v.statusYear', seletctedYear);
            }else{
                var nextMonth = --month;
            }
                component.find("month").set("v.value",nextMonth);
                component.set('v.statusMonth', nextMonth);
                component.find("week").set("v.value", "31");
        }
        var a = component.get('c.selectedWeek');
        a.setParams({
            "component": component,
            "event": event,
            "helper" : helper
        });
        $A.enqueueAction(a);
    },
    handleOnChangeDay : function(component, event, helper){
        component.set('v.isFirstTime', true);
        component.set('v.spaceFamilyLimit', 5);
        component.set('v.isSpinnerOpen', true);
        component.set('v.isDayFilter', true);
        try{
            var day = component.find("day").get("v.value"); 
            component.set('v.selectedDay', day);
            component.set("v.selectedWeek", 32);
            component.set("v.previousShowMonthButton",true);
            component.set("v.nextShowMonthButton",true);
            component.set('v.previousShowButton', true);
            component.set('v.nextShowButton', true);
            
            component.set('v.showButton', false);
            component.set('v.previousShowButton', false);
            component.set('v.nextShowButton', false);
            
            component.find("week").set("v.value", 32); 
            if(day == 'AllDays'){
                component.set('v.isDayFilter', false);
                component.set('v.statusWeek', 32);
                component.set('v.selectedDay', 'AllDays');
                helper.handleOnAllDaysSelection(component, event, helper);
                
                return;
            }
            
            var dayTime = new Array(24);
            for(let index  = 0 ; index < 24; index++){
                if(index < 12){
                    dayTime[index] = index + ' AM';
                }else if(index != 12){
                    
                    dayTime[index] = (index -12) + ' PM';
                }else{
                    dayTime[index] = index + ' PM';
                }
            }
            var numOfDay = [];
            for (var i = 0; i<24; i++) {
                var res = dayTime[i]+' ';
                numOfDay.push({res, i});
                              }
                               component.set("v.numOfDays",numOfDay);
                               helper.spaceFamily(component, event, helper);
                              }catch(err){
                               component.set('v.isSpinnerOpen', false);
                               console.log(err.message)
                              }
    },
   
    expandAll : function(component, event, helper){
       
        component.set('v.isSpinnerOpen', true);
        
        setTimeout(function(){
            
            helper.expandPromises(component, event, helper);
            component.set('v.isSpinnerOpen', false);
        }, 500);
               
    },
         showMoreFinal : function(component, event, helper){
                   component.set('v.isSpinnerOpen', true);
                   var familyLimit = component.get('v.spaceFamilyLimit');
                  
                   familyLimit = 5; 
                
                   component.set('v.spaceFamilyLimit', familyLimit);

                   try{
                       component.set('v.isFirstTime', true);
                       var action = component.get("c.responseWrap");
                       let weekDay = component.get('v.statusWeek');
                       var month = component.get('v.statusMonth');
                       var year = component.get('v.statusYear');
                       var spaceLimit = component.get('v.spaceLimit');
                       helper.spaceFamily(component, event, helper);
                       var selectedDay =  component.get('v.selectedDay'); 
                       var spaceOppLimit = component.get('v.spaceOppLimit');
                       if(selectedDay == 'AllDays'){
                           selectedDay = null;
                       }
                      
                       component.set("v.statusWeek", weekDay);
                       var param = {
                           "month": month,
                           "year": year,
                           "weekDay" : weekDay,
                           "selectedDay" :selectedDay,
                           "spaceFamilyLimit" : familyLimit,
                           "spaceLimit" : spaceLimit,
                           "spaceOppLimit": spaceOppLimit
                       };
                       action.setParams({
                           "param":param
                       });
                       action.setCallback(this, function(a){
                           var state = a.getState();
                           
                           if(state == 'SUCCESS') {
                               var expandButton =  component.find('expandAndCollapse');
                               expandButton.set("v.value", 'expandall');
                               expandButton.set("v.label", 'Collapse All');
                               component.set("v.isCollapse", false);
                               component.set('v.isSpinnerOpen', false);
                               var temp1 = a.getReturnValue();
                               
                               component.set("v.spaceFamily", temp1.spacesFamilyList);
                               component.set("v.isMoreSpaceFamily", temp1.isMoreSpace);
                               this.changeHeight(component, event, helper);
                           }
                       });
                       	$A.enqueueAction(action); 
                   }catch(err){
                       component.set('v.isSpinnerOpen', false);
                   }
               }})
