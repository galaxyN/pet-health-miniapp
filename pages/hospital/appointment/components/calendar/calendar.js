const dayjs = require("dayjs");
Component({
    properties: {},
    data: {
        date: null,
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        dateArray: []
    },
    lifetimes: {
        attached: function() {
            // 在组件实例进入页面节点树时执行
            this.initCalendar();
        },
        detached: function() {
            // 在组件实例被从页面节点树移除时执行
        },
    },
    methods: {
        initCalendar: function() {  
            const now = new Date();
            this.setData({
                date: now
            })
            const year = now.getFullYear();
            const month = now.getMonth() + 1; // getMonth 返回的是0-11
            const firstDayOfMonth = new Date(year, month - 1, 1);
            const lastDateOfMonth = new Date(year, month, 0).getDate();
            const firstDayOfWeek = firstDayOfMonth.getDay(); // getDay 返回的是0-6

            let daysArray = [];
            for (let i = 1; i <= lastDateOfMonth; i++) {
                daysArray.push({ day: i, className: '' });
            }
            const tempDate = dayjs(firstDayOfMonth)
            
            // 填充上个月的最后几天
            for (let i = 0; i < firstDayOfWeek - 1; i++) {
                const day = tempDate.subtract(i+1,'day')
                daysArray.unshift({ day: day.date(), className: 'inactive' });
            }

            // 填充下个月的前几天
            const lastDate = dayjs(new Date(year, month, 0))
            const lastDayOfWeek = lastDate.day();
            if(lastDayOfWeek < 6){
                for (let i = 1; i <= 6 - lastDayOfWeek; i++) {
                    const day = lastDate.add(i,'day')
                    daysArray.push({ day: day.date(), className: 'inactive' });
                }
            }

            this.setData({
                year: year,
                month: month,
                dateArray: daysArray
            });
        },

        selectDay: function(e) {
            const day = e.currentTarget.dataset.day;
            if (!day) return;

            const updatedDays = this.data.dateArray.map(item => ({
                ...item,
                className: item.day === day ? 'selected' : ''
            }));

            this.setData({
                dateArray: updatedDays,
                selectedDay: day
            });
        },

        updateCalendar: function() {  
            const now = this.data.date;
            const year = now.getFullYear();
            const month = now.getMonth() + 1; // getMonth 返回的是0-11
            const firstDayOfMonth = new Date(year, month - 1, 1);
            const lastDateOfMonth = new Date(year, month, 0).getDate();
            const firstDayOfWeek = firstDayOfMonth.getDay(); // getDay 返回的是0-6

            let daysArray = [];
            for (let i = 1; i <= lastDateOfMonth; i++) {
                daysArray.push({ day: i, className: '' });
            }
            const tempDate = dayjs(firstDayOfMonth)
            // 填充上个月的最后几天
            for (let i = 0; i < firstDayOfWeek - 1; i++) {
                const day = tempDate.subtract(i+1,'day')
                daysArray.unshift({ day: day.date(), className: 'inactive' });
            }

            // 填充下个月的前几天
            const lastDate = dayjs(new Date(year, month, 0))
            const lastDayOfWeek = lastDate.day();
            if(lastDayOfWeek > 0 && lastDayOfWeek < 6){
                for (let i = 1; i <= 6 - lastDayOfWeek; i++) {
                    const day = lastDate.add(i,'day')
                    daysArray.push({ day: day.date(), className: 'inactive' });
                }
            }

            this.setData({
                year: year,
                month: month,
                dateArray: daysArray
            });
        },

        prevMonth: function() {
            const date = this.data.date;
            date.setMonth(date.getMonth() - 1);
            this.setData({
                date: date
            },() => {
                this.updateCalendar();
            })
        },

        nextMonth: function() {
             const date = this.data.date;
            date.setMonth(date.getMonth() + 1);
            this.setData({
                date: date
            },() => {
                this.updateCalendar();
            })
        },
    }
    
});





