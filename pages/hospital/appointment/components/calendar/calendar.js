Component({
    properties: {},
    data: {
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
            const year = now.getFullYear();
            const month = now.getMonth() + 1; // getMonth 返回的是0-11
            const firstDayOfMonth = new Date(year, month - 1, 1);
            const lastDateOfMonth = new Date(year, month, 0).getDate();
            const firstDayOfWeek = firstDayOfMonth.getDay(); // getDay 返回的是0-6

            let daysArray = [];
            for (let i = 1; i <= lastDateOfMonth; i++) {
                daysArray.push({ day: i, className: '' });
            }

            // 填充上个月的最后几天
            for (let i = 0; i < firstDayOfWeek - 1; i++) {
                daysArray.unshift({ day: '', className: 'inactive' });
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

            const updatedDays = this.data.days.map(item => ({
                ...item,
                className: item.day === day ? 'selected' : ''
            }));

            this.setData({
                days: updatedDays,
                selectedDay: day
            });
        }
    }
    
});





