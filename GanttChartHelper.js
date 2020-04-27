({
    intitate :  function(component,event,helper){
	component.set('v.spaceFamilyLimit', $A.get("$Label.c.Space_Family_Limit"));
        var numOfDay = [];
        var numOfYear = [];
        var curr = new Date;
        var todayMonth = curr.getMonth();
        var todayYear = curr.getFullYear();
        for(let index = todayYear - 10 ; index < (todayYear + 11)  ;index++){
            numOfYear.push(index);
        }
        component.set('v.numOfYears', numOfYear);

        const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
                            "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
                           ];
        
        var todayMonthName = monthNames[curr.getMonth()];
        component.set('v.getmonthName',todayMonthName);
        
        var weekday = new Array(7);
        weekday[0] = "SUN";
        weekday[1] = "MON";
        weekday[2] = "TUE";
        weekday[3] = "WED";
        weekday[4] = "THU";
        weekday[5] = "FRI";
        weekday[6] = "SAT";
        
        var d = new Date(new Date().getFullYear(), todayMonth, 1);
        var n = weekday[d.getDay()];
        var m = d.getDay();
        
        var getDaysInMonth = function(todayMonth,todayYear) {
            return new Date(todayYear, todayMonth+1, 0).getDate();
        };
        var days = getDaysInMonth(todayMonth, todayYear);
        for (var i = 1; i<=days; i++) {
            var res = weekday[((m-1) + i) % 7]+' ';
            numOfDay.push({res,i});  
        }
        var month = component.get('v.statusMonth');
        if(month == 1){
            component.set('v.previousShowMonthButton',false);  
        }else{
            component.set('v.previousShowMonthButton',true);  
        }
        
        if(month == 13){
            component.set('v.nextShowMonthButton',false);
        }else{
            component.set('v.nextShowMonthButton',true);
        }             
        component.set('v.showButton', true); 
        component.set('v.showMonthButton',true); 
        component.set("v.numOfDays",numOfDay);
        component.set("v.numOfHours",numOfDay);
        component.set('V.statusMonth', todayMonth + 1);
        component.set('V.statusYear', todayYear);        
    },
    
    spaceFamily : function(component, event, helper) {
        
        try{
            var action = component.get("c.spacesFamilyList");
            let weekDay = component.get('v.statusWeek');
            var month = component.get('v.statusMonth');
            var year = component.get('v.statusYear');
            var spaceFamilyLimit = component.get('v.spaceFamilyLimit');
            var spaceLimit = component.get('v.spaceLimit');
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
                "spaceFamilyLimit" : spaceFamilyLimit,
                "spaceLimit" : spaceLimit,
                "spaceOppLimit": spaceOppLimit,
                "isFirstTime" : component.get('v.isFirstTime')
            };
            action.setParams({
                "param" :param
            });
            action.setCallback(this, function(a){
                var state = a.getState();
                
                if(state == 'SUCCESS') {
                    component.set('v.isSpinnerOpen', false);
                    var temp1 = a.getReturnValue();
                    component.set("v.spaceFamily", temp1.spacesFamilyList);
                    console.log(temp1.spacesFamilyList)
                    component.set("v.isMoreSpaceFamily", temp1.isMoreSpace);
                    component.set('v.isFirstTime', false);
                    this.changeHeight(component, event, helper);
                }
            });
            $A.enqueueAction(action); 
        }catch(err){
            component.set('v.isSpinnerOpen', false);
            console.log('Error in getting space family list in Gantt_Chart', err.message);
        }
    },
    spaceFamilyOnChangeWeek : function(component, event, helper, numOfDay, week) {
        var action = component.get("c.spacesFamilyList");
        let weekDay = component.get('v.statusWeek');
        var month = component.get('v.statusMonth');
        var year = component.get('v.statusYear');
        
        var spaceFamilyLimit = component.get('v.spaceFamilyLimit');
        var spaceLimit = component.get('v.spaceLimit');
        var spaceOppLimit = component.get('v.spaceOppLimit');
        component.set("v.statusWeek", weekDay);
         var param = {
             "month": month,
             "year": year,
             "weekDay" : weekDay,
             "selectedDay" :null,
             "spaceFamilyLimit" : spaceFamilyLimit,
             "spaceLimit" : spaceLimit,
             "spaceOppLimit": spaceOppLimit,
             "isFirstTime" : component.get('v.isFirstTime')
            };
        action.setParams({
            "param" :param
        });
        action.setCallback(this, function(a){
            var state = a.getState();
            if(state == 'SUCCESS') {
                component.set('v.numOfDays',numOfDay);  
                component.set("v.week",week);
                component.set('v.isSpinnerOpen', false);
                var temp1 = a.getReturnValue();
                component.set("v.spaceFamily", temp1.spacesFamilyList);
                component.set("v.isMoreSpaceFamily", temp1.isMoreSpace);                
            }
        });
        $A.enqueueAction(action); 
    },
     showMoreSpace : function(component, event, helper, index) {
        
        try{
            
            var action = component.get("c.showMoreSpaceList");
            let weekDay = component.get('v.statusWeek');
            var month = component.get('v.statusMonth');
            var year = component.get('v.statusYear');
            var spaceFamilyLimit = component.get('v.spaceFamilyLimit');
            var spaceLimit = component.get('v.spaceLimit');
            var selectedDay =  component.get('v.selectedDay'); 
            var spaceOppLimit = component.get('v.spaceOppLimit');
            
           
            var res = index.split(":");
            var FaIndex = res[0];
            var sfRecordId =  res[1];
            if(selectedDay == 'AllDays'){
                selectedDay = null;
            }
            component.set("v.statusWeek", weekDay);
            action.setParams({
                "month": month,
                "year": year,
                "weekDay" : weekDay,
                "selectedDay" :selectedDay,
                "spaceFamilyLimit" : spaceFamilyLimit,
                "spaceLimit" : spaceLimit,
                "spaceOppLimit": spaceOppLimit,
                "sfId": sfRecordId
            });
            action.setCallback(this, function(a){
                var state = a.getState();
                
                if(state == 'SUCCESS') {
                    component.set('v.isSpinnerOpen', false);
                    var temp1 = a.getReturnValue();
                    var sfList =  component.get("v.spaceFamily");
                    sfList[FaIndex] = temp1[0];
                    component.set("v.spaceFamily", sfList);
                    this.changeHeight(component, event, helper);
                }else{
                     component.set('v.isSpinnerOpen', false);
                }
            });
            $A.enqueueAction(action); 
        }catch(err){
            component.set('v.isSpinnerOpen', false);
            console.log('Error in getting space family list in Gantt_Chart', err.message);
        }
    },
    showMoreSpaceToOppList : function(component, event, helper, index) {
        
        try{
            
            var action = component.get("c.showMoreSpaceToOppList");
            let weekDay = component.get('v.statusWeek');
            var month = component.get('v.statusMonth');
            var year = component.get('v.statusYear');
            var spaceFamilyLimit = component.get('v.spaceFamilyLimit');
            var spaceLimit = component.get('v.spaceLimit');
            var selectedDay =  component.get('v.selectedDay'); 
            var spaceOppLimit = component.get('v.spaceOppLimit');
            
           
            var res = index.split(":");
            var FaIndex = res[0];
            var spIndex =  res[1];
             var spaceId =  res[2];
            var sfRecordId =  res[3];
            var items = component.get("v.spaceFamily");
            var spcaeToOpp = items[FaIndex].spaceList[spIndex];
            if(selectedDay == 'AllDays'){
                selectedDay = null;
            }
           
            component.set("v.statusWeek", weekDay);
            action.setParams({
                "month": month,
                "year": year,
                "weekDay" : weekDay,
                "selectedDay" :selectedDay,
                "spaceFamilyLimit" : spaceFamilyLimit,
                "spaceLimit" : spaceLimit,
                "spaceOppLimit": spaceOppLimit,
                 "sfId": sfRecordId,
                "spId": spcaeToOpp.spRecordId
            });
            action.setCallback(this, function(a){
                var state = a.getState();
                
                if(state == 'SUCCESS') {
                    component.set('v.isSpinnerOpen', false);
                    var temp1 = a.getReturnValue();
                    var sfList =  component.get("v.spaceFamily");
                    sfList[FaIndex].spaceList[spIndex].spaceOppList = temp1[0].spaceList[0].spaceOppList;
                    component.set("v.spaceFamily", sfList);
                    this.changeHeight(component, event, helper);
                }else{
                     component.set('v.isSpinnerOpen', false);
                }
            });
            $A.enqueueAction(action); 
        }catch(err){
            component.set('v.isSpinnerOpen', false);
        }
    },
    // Set width of table
    changeHeight: function(component, event, helper) {
        var screenWidth = document.documentElement.clientWidth;
        component.set("v.divHeight", screenWidth);
    },
    getDayInMonth: function(month, todayYear){
        let day = 31;
        
        switch(parseInt(month)) {
            case 1:
                day = 31;
                break;
            case 2:
                if (((todayYear % 4 == 0) && (todayYear % 100!= 0)) || (todayYear%400 == 0)){
                    day = 29;
                }else{
                    day = 28;
                }
                
                break;
            case 3:
                day = 31;
                break;
            case 4:
                day = 30;
                break;
            case 5:
                day = 31;
                break;
            case 6:
                
                day = 30;
                break;
            case 7:
                day = 31;
                break;
            case 8:
                day = 31;
                break;
            case 9:
                day = 30;
                break;
            case 10:
                day = 31;
                break;
            case 11:
                day = 30;
                break;
            case 12:
                day = 31;
                break;
            default:
                day = 31;
        }
      
        return day;
    },
    yearMonthChange : function(component, event, helper){
        try{
            component.set('v.isFirstTime', true);
            component.set('v.spaceFamilyLimit', $A.get("$Label.c.Space_Family_Limit"));
            component.set('v.isSpinnerOpen', true);
            component.set('v.isDayFilter', false);
            component.set('v.selectedDay', 'AllDays'); 
            var week = component.find("week").get("v.value");
       
            component.set('v.statusWeek', week);
            var month = component.get('v.statusMonth');
            const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
                "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
            ];

        var todayMonthName = monthNames[month-1];
        component.set('v.getmonthName',todayMonthName);
        if(month == 12 && week == 32){
        }else if(week != 32){
        component.set("v.nextShowMonthButton",true);
        }
       
        if(month == 1 && week == 32){
        }else if( week == 32){
            component.set('v.previousShowMonthButton',true);  
        }
        //Set Moth day 31, 30, OR 28 FEB    
        let days;
        if(parseInt(month) % 2 == 0 && parseInt(month)  < 8){
            days = 30;
        }else if(parseInt(month) == 2){

        }else if((parseInt(month) % 2 == 0 && parseInt(month)  >= 8) || (parseInt(month) % 2 != 0 && parseInt(month)  < 8)){
            days = 31;
        }else{
            days = 30;
        }
       let selectedYear = component.get('V.statusYear');

            if(week != 32){
            days = week;
        }
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
        
        if(week == 8){
            component.set("v.previousShowMonthButton",false);
            component.set("v.nextShowMonthButton",false);
            component.set('v.previousShowButton', true);
            component.set('v.nextShowButton', true);
             component.set('v.showButton', true);
            for (var i = 1; i<=week; i++) {
                var res = weekday[((m-1) + i) % 7]+' ';
                numOfDay.push({res,i});  
                              }              
                              } else if(week == 16){
                               component.set("v.previousShowMonthButton",false);
                               component.set("v.nextShowMonthButton",false);
                               component.set('v.previousShowButton', true);
                               component.set('v.nextShowButton', true);
                               component.set('v.showButton', true);
                               for (var i = 9; i<=week; i++) {
                               var res = weekday[((m-1) + i) % 7]+' ';
                               numOfDay.push({res,i});  
                              }  
                              }else if(week == 24){
                               component.set("v.previousShowMonthButton",false);
                               component.set("v.nextShowMonthButton",false);
                               component.set('v.previousShowButton', true);
                               component.set('v.showButton', true);
                               component.set('v.nextShowButton', true);
                               for (var i = 17; i<=week; i++) {
                               var res = weekday[((m-1) + i) % 7]+' ';
                               numOfDay.push({res,i});  
                              }  
                              }else if(week == 31){
                               component.set("v.previousShowMonthButton",false);
                               component.set("v.nextShowMonthButton",false);
                               component.set('v.previousShowButton', true);
                               component.set('v.showButton', true);
                               component.set('v.nextShowButton', true);
                               let monthDays =  helper.getDayInMonth(month, year);
                              
                               for (var i = 25; i<= monthDays; i++) {
                               var res = weekday[((m-1) + i) % 7]+' ';
                               numOfDay.push({res,i});  
                              }  
                              }else{
                               
                               component.set('v.previousShowButton', false);
                               component.set('v.nextShowButton', false);
                               if(month == 1){
                               component.set("v.previousShowMonthButton",true); 
                              }else{
                               component.set("v.previousShowMonthButton",true); 
                              }
                               if(month == 12){
                               component.set("v.nextShowMonthButton",true);
                              }else{
                               component.set("v.nextShowMonthButton",true);
                              }
                                days = helper.getDayInMonth(month, year);
                              
                               for (var i = 1; i<=days; i++) {
                               var res = weekday[((m-1) + i) % 7]+' ';
                               numOfDay.push({res,i});  
                              }
                              }
                               var numOfHour = [];
                                days = helper.getDayInMonth(month, year);
                               for (var i = 1; i<=days; i++) {
                               var res = weekday[((m-1) + i) % 7]+' ';
                               numOfHour.push({res,i});  
                              }
                                    component.set("v.numOfDays",numOfDay);
                                    component.set("v.numOfHours",numOfHour);
                              
                               helper.spaceFamily(component, event, helper);
                               var expandButton =  component.find('expandAndCollapse');
                               expandButton.set("v.value", 'collapseall');
                               expandButton.set("v.label", 'Collapse All');
                               component.set("v.isCollapse", false);
                               
       }catch(err){
           alert(err.message)
       }
    },
          isAtribute : function(component, event, helper){                      
            component.set('v.isFirstTime', true);
            component.set('v.spaceFamilyLimit', $A.get("$Label.c.Space_Family_Limit"));
            component.set('v.isSpinnerOpen', true);
            component.set('v.isDayFilter', false);  
          },
         isToggle: function(component, event, helper){                        
         component.set('v.isFirstTime', true);
         component.set('v.isSpinnerOpen', true);                       
                        
      },
                               
                     
                                                         
    handleOnAllDaysSelection: function(component, event, helper){
        try{
            
            var numOfDay = [];
            
            var todayMonth = component.get('V.statusMonth');
            
            var todayYear = component.get('V.statusYear');
            
            const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
                                "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
                               ];
            
            var todayMonthName = monthNames[todayMonth-1];
            component.set('v.getmonthName',todayMonthName);
            
            var weekday = new Array(7);
            weekday[0] = "SUN";
            weekday[1] = "MON";
            weekday[2] = "TUE";
            weekday[3] = "WED";
            weekday[4] = "THU";
            weekday[5] = "FRI";
            weekday[6] = "SAT";
            
            var d = new Date(todayYear, todayMonth, 1);
            var n = weekday[d.getDay()];
            var m = d.getDay();
            
            var getDaysInMonth = function(todayMonth,todayYear) {
                return new Date(todayYear, todayMonth+1, 0).getDate();
            };
            var days = getDaysInMonth(todayMonth, todayYear);
            for (var i = 1; i<=days; i++) {
                var res = weekday[((m-1) + i) % 7]+' ';
                numOfDay.push({res,i});  
                              }
                               var month = component.get('v.statusMonth');
                               if(month == 1){
                               component.set('v.previousShowMonthButton',false);  
                              }else{
                               component.set('v.previousShowMonthButton',true);  
                              }
                               
                               if(month == 13){
                               component.set('v.nextShowMonthButton',false);
                              }else{
                               component.set('v.nextShowMonthButton',true);
                              }             
                               component.set('v.showButton', true); 
                               component.set('v.showMonthButton',true); 
                               component.set("v.numOfDays",numOfDay);
                               component.set("v.numOfHours",numOfDay);
                               // component.set('V.statusMonth', todayMonth + 1);
                               //component.set('V.statusYear', todayYear);
                               //component.set('V.statusYear', days);
                               
                               this.spaceFamily(component, event, helper);
                              }catch(err){
                               console.log(err.message)
                              }
                              },
                               expandPromises : function(component, event, helper){
                                   try{
                                       let promise = new Promise(function(resolve, reject) {
                                       try{
                                           
                                           let buttonValue = event.getSource().get("v.value");
                                           
                                           if(buttonValue == 'expandall'){
                                               event.getSource().set("v.value", 'collapseall');
                                               event.getSource().set("v.label", 'Collapse All');
                                               component.set("v.isCollapse", false);
                                           }else{
                                               event.getSource().set("v.value", 'expandall');
                                               event.getSource().set("v.label", 'Expand All');
                                               component.set("v.isCollapse", true);
                                           }
                                           
                                           var spaceFamily =  component.get("v.spaceFamily");
                                           
                                          for(let index = 0 ; index < spaceFamily.length; index++){
                                               if(buttonValue == 'expandall'){
                                                   spaceFamily[index].expanded = true;
                                               }else{
                                                   spaceFamily[index].expanded = false;
                                               }
                                               
                                               let spaceList = spaceFamily[index].spaceList;
                                               for(let jIndex = 0 ; jIndex < spaceList.length ; jIndex++){
                                                   if(buttonValue == 'expandall'){
                                                       spaceList[jIndex].expanded = true;
                                                   }else{
                                                       spaceList[jIndex].expanded = false;
                                                   }
                                                   
                                               }
                                           }
                                          component.set("v.spaceFamily", spaceFamily);
                                           resolve('Success');
                                           
                                       }catch(err){
                                           reject();
                                       }
                                   });
                                   
                                   // resolve runs the first function in .then
                                   promise.then(
                                       function(result) { if(result == 'Success'){
                                           component.set('v.isSpinnerOpen', false);
                                         // component.find("spinner").hide();
                                           
                                       }},
                                       function(error) { /* handle an error */ }
                                   );
                                   }catch(err){
                                       console.log(err.message);
                                   }
                               },
                               rendered: function(cmp, evt, helper) {
                                    
               if( cmp.get("v.isSpinnerOpen")) {
                    cmp.find("spinner").show();
                                       }else{
                                          
                                       cmp.find("spinner").hide();
                                      }
    }                               
})
