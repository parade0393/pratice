export const mixin =  {
    computed:{

    },
    methods:{
        show(){
            alert("局部混入")
        }
    }
}

/**
 *防抖，单位时间只触发最后一次
 * @param{?Number|500} time -间隔时间
 * @param{Function} fn -执行事件，函数有参数需要使用箭头函数包裹
 * @param{?String|"click"}event  -事件类型，默认"click"
 * @param{Array}binding.value -[fn,event,time]
 */
export const denounceMixin = {
    directives: {
        debounce: {
            inserted(el, binding) {
                let [fn, event = "click", time = 500] = binding.value;
                let timer;
                el.addEventListener(event, () => {
                    timer && clearTimeout(timer);
                    timer = setTimeout(() => fn(), time);
                });
            },
        },
    },
};

