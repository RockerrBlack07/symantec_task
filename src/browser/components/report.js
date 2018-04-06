import React,{Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
//import {selectUser,userUpdate} from '../actions';
class Report extends Component{
    constructor(props){
        super(props);
        this.sortedArr=[];
        this.countsTracker=[];
    }
    rndrTimings(){
        return this.props.users.timers.map((x,y)=>{
            if(x[1]!="")
                {
                    return(
                        <div key={y}>
                        <p className="time">{x[0]}</p>   
                        <p className="time mid-time"><span>{x[1]}</span></p>
                        </div>
                    );
                }
                else
                    {
                     return(
                        <div  key={y}>
                        <p className="time">{x[0]}</p>   
                        </div>
                    );
                    }
        })
    }

   sortNumber(a, b) {
        return a.time.split(':')[0] - b.time.split(':')[0];
    }   
    timeFilter(){
        let Arr=[],finalVal='';
          for(var i=0;i<this.props.users.timers.length;i++){
            let flag = 0;
            for(var j=0;j<this.props.users.schedule.length;j++){
                if(flag ==0){
                    if(this.props.users.timers[i][2] == this.props.users.schedule[j].time.split(':')[0]){
                        finalVal = this.props.users.schedule[j];
                        flag = 1;
                    }
                    else{
                        finalVal = '';
                        flag= 0;
                    }    
                }
            }
       Arr.push(finalVal);
  }
   this.sortedArr = this.props.users.schedule.sort(this.sortNumber);  
    for(let k=0;k<this.sortedArr.length-1;k++){
            if(this.sortedArr[k].time.split(':')[0] == this.sortedArr[k+1].time.split(':')[0]){
                let duplicateIndex = Arr.indexOf(this.sortedArr[k]);
                Arr.splice( duplicateIndex+1, 0, this.sortedArr[k+1]);
            }
          }
    this.countsTracker=this.timecounter(Arr);
    return Arr;

    }
    timecounter(arr) {
    var current = null;
    var cnt = 0, obj={};;
    for (var i = 0; i < arr.length; i++) {
             if(arr[i]!="")
                {
                    if (`time_${arr[i].time.split(':')[0]}` != current) {
                        if (cnt > 0) {
                            obj[current]=cnt;
                        }
                        current = `time_${arr[i].time.split(':')[0]}`;
                        cnt = 1;
                    } else {
                        cnt++;
                    }
                    if(arr.indexOf(arr.filter(x=>x).pop())==i)
                        {
                           
                            obj[current]=cnt;
                        }    
                   
                 }
    }
    return obj;
}
      rndrDesc(){
          var timeFlag=false,flgCount=0;
       return this.timeFilter().map((x,y,z)=>{
            if(x!="")
                {
                   var indxIncValue=(z[y+1]!="")? z[y+1].time.split(':')[0]:"";
                   var htFmla=(x.duration/60)*100;
                   var topFmla=(x.time.split(':')[1]/60)*100;
                 if(z[y].time.split(':')[0]== indxIncValue)
                    {
                        if(Object.keys(this.countsTracker).indexOf(`time_${z[y].time.split(':')[0]}`)>-1)
                            {
                               var widths=100/this.countsTracker[Object.keys(this.countsTracker)[Object.keys(this.countsTracker).indexOf('time_' + z[y].time.split(':')[0])]];
                            }
                        var obj={hts:Math.round(htFmla)+"%",tops:Math.round(topFmla)+"%",widths:`${widths}%`,lefts:""}
                        timeFlag=true;
                        var htFmla2=(z[y+1].duration/60)*100+"%";
                        var topFmla2=(z[y+1].time.split(':')[1]/60)*100+"%";
                      return(
                            <div className="data-holder"  key={y}>
                                <div className="data" style={{height: obj.hts,top:obj.tops,width:obj.widths}}>
                                    <p className="meeting-text">{x.description}</p>
                                </div>
                                <div className="data" style={{height: htFmla2,top:topFmla2,width:obj.widths}}>
                                    <p className="meeting-text">{z[y+1].description}</p>
                                </div>
                            </div>
                        );
                    }
                    else
                     {
                         if( timeFlag==true)
                            {
                                timeFlag=false;
                                flgCount=1;
                                return(
                                    <div key={y}></div>
                                );

                            }
                            if(flgCount==1 && z[y-1]!="" && z[y]!="" )
                                {
                                    var date1 = new Date(2018, 0, 1,  z[y-1].time.split(':')[0], z[y-1].time.split(':')[1]); // Time calculation only
                                    var date2 = new Date(2018, 0, 1, z[y].time.split(':')[0], z[y].time.split(':')[1]);
                                    if(parseInt(date2 - date1)/ (1000*60*60)<(z[y-1].duration)/60)
                                        {
                                            if(Object.keys(this.countsTracker).indexOf(`time_${z[y-1].time.split(':')[0]}`)>-1)
                                            {
                                             var widths=100/this.countsTracker[Object.keys(this.countsTracker)[Object.keys(this.countsTracker).indexOf('time_' + z[y-1].time.split(':')[0])]];
                                            }
                                           var obj={hts:Math.round(htFmla)+"%",tops:Math.round(topFmla)+"%",widths:`${widths}%`};    
                                        }
                                        else
                                          var obj={hts:Math.round(htFmla)+"%",tops:Math.round(topFmla)+"%",widths:""};
                                   
                                    flgCount=0;
                                }
                                else
                                 var obj={hts:Math.round(htFmla)+"%",tops:Math.round(topFmla)+"%",widths:""}
              
                      }  
                              
                    return(
                        <div className="data-holder" key={y}>
                        <div className="data" style={{height: obj.hts,top:obj.tops,width:obj.widths}}>
                            <p className="meeting-text">{x.description}</p>
                        </div>
                        </div>
                   );
                  
                }
                else
                    {
                        if(z.length-1==y)
                            {
                               return(
                                <div key={y}> </div>
                                 ); 
                            }
                    else
                        {
                            return(
                                <div className="data-holder" key={y}> </div>
                            );
                        }
                    }

       });
    }
    render(){
        return(
             <div className="daily-schedule">
               <div className="vertical-timeline">
                        {this.rndrTimings()}
                    </div>
                    <div className="timeline-data" >
                           {this.rndrDesc()}
                    </div>
              </div>
        )

    }
};

const mapStateToProps=(state,y)=>{
    return{
        users:state.users

    }

}
/*const matchDispatchProps=(dis)=>{
    return bindActionCreators({updates:userUpdate},dis);
}matchDispatchProps*/

export default connect(mapStateToProps)(Report);