module.exports = {
        //props: ['父组建传的值'],
        data:function(){
            lifecycle.push("data");
            return {
                msg: '各个阶段，可以查看控制台输出，message from my-views',
                title:'my_views',
                lifecycle: lifecycle
            }
        },
        //这里是route的生存周期
        route:{
            //waitForData: true, //  数据加载完毕后再切换试图，也就是 点击之后先没反应，然后数据加载完，再出发过渡效果
            canActivate:function(transition){
                //  canActivate阶段，可以做一些用户验证的事情(是否可以被激活)
                //  在验证阶段，当一个组件将要被切入的时候被调用。
            },
            activate:function(transition){
                                //  在激活阶段被调用，在 activate 被断定（ resolved ，指该函数返回的 promise 被 resolve ）。用于加载和设置当前组件的数据。(激活)
                //this.$root.$set('header',this.title);
                transition.next();
                //此方法结束后，api会调用afterActivate 方法
                //在aftefActivate中 会给组件添加 $loadingRouteData 属性 并设置为true
            },
            data: function(transition) {
                var _this = this;
                //  在激活阶段被调用，在 activate 被断定（ resolved ，指该函数返回的 promise 被 resolve ）。用于加载和设置当前组件的数据
                // 说明之前请求过 则不用再请求了
                if(this.$root.myViewsData){
                    this.$data = this.$root.myViewsData;
                    transition.next();
                    console.log('已经请求过了不再请求数据');
                    return;
                }

                //将数据同步到根节点
                this.$root.myViewsData = this.$data;
                setTimeout(function(){
                    //这里 _this.$loadingRouteData 是 true
                    transition.next({msg:'加载后的数据'});
                    //在调用完transition.next 后，_this.$loadingRouteData 为 false
                }.bind(this),4000);
            },
            canDeactivate:function(transition){
                //  在验证阶段，当一个组件将要被切出的时候被调用。(是否可以被禁用)
            },
            deactivate: function (transition) {
                //  在激活阶段，当一个组件将要被禁用和移除之时被调用。(禁用)
            }
        },
        beforeCreate:function(){
            // 在实例初始化之后，数据观测(data observer) 和 event/watcher 事件配置之前被调用。
        },
        created:function(){
            // 实例已经创建完成之后被调用。在这一步，实例已完成以下的配置：数据观测(data observer)，属性和方法的运算， watch/event 事件回调。然而，挂载阶段还没开始，$el 属性目前不可见。
        },
        beforeCreate:function(){
            // 在实例初始化之后，数据观测(data observer) 和 event/watcher 事件配置之前被调用。
        },
        mounted:function(){
            // el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$el 也在文档内。
        },
        beforeUpdate: function(){
            // 数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。 
            // 你可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。
        },
        Update: function(){
            // 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。

            //当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。然而在大多数情况下，你应该避免在此期间更改状态，因为这可能会导致更新无限循环。
        },

        // <keep-alive> 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。
        activated: function(){
            // keep-alive 组件激活时调用。
        },
        deactivated: function(){
            // keep-alive 组件停用时调用。
        },

        beforeDestroy:function(){
            // 实例销毁之前调用。在这一步，实例仍然完全可用。
        },
        destroyed:function(){
            // Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。
        }
    }
