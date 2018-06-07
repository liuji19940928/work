
        1. 项目框架结构搭建(webpack + vue)

        webpack 打包 整合代码 webpack -p
        hbuilder 打包成移动App

        vue-cli

        2. 使用路由跳转页面(vue-router)

        <router-link :to='/home'></router-link>
        <router-link :to='/photo/photoinfo/1'></router-link>
        new VueRouter({
                routes:[
                        {path:'/home',component:home},
                        {path:'/photo/photoinfo/:id',component:home}

                ]
        })

        3. 使用vue-resource(axios)请求真实数据 

        在哪里发送数据请求? 生命周期函数created
        怎么发送数据请求? 
        this.$http.get(url).then(function(res){
                console.log(res.body)
        })

        this.$http.post(url,{需要发送的数据},{emulateJSON:true}).then(function(res){
                consloe.log(res.body)
        })

        4. 复习以及巩固vue的基础知识(vue指令、组件传值)

        父向子传值
        子向父传值
        非父子组件传值

        计算属性
        watch

# vue基础知识
## MVVM模式讲解

> M代表模型,V代表视图,VM代表视图模型

> 在Vue中,M就是Vue实例中data里面定义的数据,V就是Vue实例所托管的区域,VM就是使用Vue实例化出来的对象

## MVC和MVVM模式的区别

> 主要区别可以理解两者的通信方式

> MVC: V中用户交 互后的数据流向C,C经过逻辑处理后再提交到M进行保存;**M中的数据如果改变,会直接作用于视图,即M直接影响视图的更新**.

> MVVM:V中用户交互后的数据流向VM,VM处理数据后更新到M进行储存,**M中数据如果改变,则也会交由VM,VM再通知V进行更新视图**.

## 双向数据绑定原理

> V -> M 监听表单元素的value `onchange` 事件 然后将新值赋值到对应的属性上去

> M -> V angular和vue实现机制有所区别

### angular 双向数据绑定原理

> 会有一个类似定时器的功能,每隔一段时间自动遍历一下有没有属性值发生变化，当属性值发生变化 会调用$wantch事件 去监听页面上所有指令,查询出有需要改变的值,然后调用$apply方法进行DOM更新

###  Vue中双向数据绑定原理

> 利用 `Object.defineProperty()`内部的`setter`方法 监听数据的写操作(设置属性的操作),在`setter`方法内部去更新DOM中显示的数据

        var o = {};
        o.name = 'zxx';
        var age;

        // 使用Object.defineProperty这种方式给对象添加属性,默认该属性不可修改.
        Object.defineProperty(o,age,{
                //    value:18,
                //    writable:true

                get:function(){
                        console.log('我被获取了');
                        return age;
                },
                // set方法可以监听到数据被改变
                set:function(){
                        // 每次监听到属性发生变化时,都去通知DOM上绑定的该属性进行更新
                        // 页面上绑定了age属性的dom元素可以通过updateDOM()进行对value值的更新
                        unpdataDOM();
                        console.log('我被设置数据了');
                }
        });

        o.age = 18;
        console.log(o.age);

## splice 和 slice的区别

> `Array.prototype.splice(startIndex,length)`方法是对数组进行截取的方法,从`startIndex`位置开始截取,截取`length`个元素,截取完返回一个新数组,新数组中的元素就是截取出来的元素.同时会影响原数组.

        var arr = [1,2,3,4,5];
        var newarr = arr.splice(1,2); // 从索引1开始截取,截取2个元素 newarr == [2,3]
        console.log(newarr); // [2,3]
        console.log(arr); // [1,4,5]

> `Array.prototype.slice(startIndex,endIndex)`方法也是对数组进行截取,从`startIndex`开始截取,一直截取到`endIndex`索引为止,截取出来的元素包含`startIndex`,不包含`endIndex`位置的元素。不会对原数组产生影响.

        var arr = [1,2,3,4,5];
        var newarr = arr.slice(1,2); // 从索引1开始截取,截取到索引为2的元素为止,包含索引1的元素,不包含索引2的元素
        console.log(newarr); // [2]
        console.log(arr); // [1,2,3,4,5]

## findeIndex方法实现

``` javascript
// 可以对数组进行遍历 然后返回满足条件(回调函数)的元素的索引
function findIndex(array,callback){
        for(var i = 0;i<array.length;i++){
                var istrue = callback(array[i]);
                if(istrue){
                        break;
                }
        }
        return i;
}

var index = findIndex([1,2,3,4,5],function(item){
        return item == 2;// 找到数组中为2的元素的索引
})

console.log(index);// 1
```

## 编码步骤
1. 引入vue.js文件
2. 定义一个vue的管理范围

        <div id='app'>
        
        </div>
 
        vue1.0里面vue的管理区域的id可以定义在HTML以及body标签上
        vue2.0里面不允许这样来做

3. 定义一个vue的对象

        var vm = new Vue({
            el:'#app',
            // data定义vue实例的所有属性
            data:{
                // 定义将来要在vue管理区域中使用的数据
                name："zs"
            },
            // methods定义vue实例所有的方法
            methods：{
                fn:function(){
                    this.name = 'ls'
                }
            }
        })


## 系统指令
- `{{}}`:插值表达式

        作用:将vue对象中的数据以及表达式显示到vue托管区域中

        {{这里书写vue对象中data里面的数据或者表达式}}

- `v-text`:输出文本数据

        <span v-text='name'></span>

- `v-html`:输出HTML结构数据

        <div v-html='name'></div>

        data：{
            name：'<span>zs</span>'
        }

- `v-cloak`:解决表达式闪烁问题

        1. 定义一个样式
        <style>
            [v-cloak]{
                display:none
            }
        </style>

        2. 使用

        <div v-cloak>{{name}}</div>

        原理:当vue.js文件还没有加载出来时 使用[v-cloak]样式作用于当前指令所在标签,当vue.js能够起作用时,会自动删除v-cloak指令

- `v-bind`:动态给标签或者组件绑定属性

        <div v-bind:class = 'box'></div>

        // 使用:简写v-bind
        <div :class = 'box'></div>

        // 当绑定的属性值是常量字符串+变量时 我们在绑定这个属性时 是需要绑定一个对象,这个对象的键就是需要绑定的属性名 这个对象的值就是常量字符串+变量
        <a v-bind="{href:'http://itcast.cn/index/'+id}">跳转</a>

- `v-on`:绑定事件

        <div v-on:click = 'click'></div>
        <div @click = 'click'></div>

- `v-model`：双向数据绑定

        // 可以使用的标签:input textarea select 组件
        <input v-model='name'></input>

        // name会和表单元素的value进行关联 value值变化 name值变化 反过来name值发生变化 value值也会发生变化

- `v-for`:循环输出HTML元素

        <div v-for='(item,index) in list' :key = 'index'>{{item.name}}</div>

- `v-if`：根据表达式值的真假决定元素的显示隐藏

        // isShow为true显示div 为false隐藏div
        // v-if是直接操作DOM 即隐藏时会将该div从DOM结构中移除
        <div v-if='isShow'></div>

- `v-show`: 根据表达式值的真假决定元素的显示隐藏

        // isShow为true显示div 为false隐藏div
        // v-show是操作div的样式 显示时添加 style = 'display:block'; 隐藏时添加style = 'display:none'
        <div v-if='isShow'></div>

        v-if 是删除DOM元素 效率比较低 会造成页面的结构重新绘制
        v-show 是控制样式 只会改变当前这一个元素的样式 不会造成页面结构的重新绘制

## 自定义过滤器

### 自定义私有过滤器

> 私有过滤器是将过滤器中的方法直接绑定到当前Vue实例上面,所以 只能在当前实例托管区域中使用

        new Vue({
                el:'#app',
                ....
                filters：{
                        // 每一个过滤器都是一个方法
                        `过滤器名称`：function(input,arguments){
                                // input 是使用过滤器时 管道符 前面的数据
                                // arguments 是过滤器方法自己的参数
                                return `对input进行处理的代码逻辑`
                        }
                }
        })

### 全局过滤器

> 全局过滤器相当于是将过滤器中的方法绑定到了Vue构造函数的原型中,可以保证每一个Vue实例的托管区域都可以使用

        Vue.filter('过滤器名称',function(input,arguments){
                return `对input进行处理的代码逻辑`
        })

### 使用过滤器

        {{需要被处理的数据 | 过滤器名称(arguments)}}
        {{new Date() | datefmt('YYYY-MM-DD HH:mm:ss')}}

## 键盘修饰符

### 使用键盘修饰符

        // 使用键盘修饰符
        v-on:事件名称.`修饰符名称`
        eg:
        v-on:keydown.enter = 'func'

### 自定义键盘修饰符

        // vue1.0
        Vue.driective('on').keyCodes.f2 = 113

        // vue2.0
        Vue.config.keyCodes.f2 = 113

## 自定义指令

### 自定义属性指令

        <div v-on:click = 'fn'></div>

        Vue.driective('指令名称',function(){
                // 在函数内部完成该指令的逻辑
                // this.el 获取使用当前指令的元素
                // this.vm 获取到的是当前指令所属的vue对象实例
                // this.expression 获取到的是 指令等号后面所书写的表达式
        })

        Vue.directive('指令名称',{
                inserted：function(el,binding){
                // el 当前指令所在元素
                // binding.expression 当前指令后面所跟表达式
                // binding.value 当前指令表达式的值
                }
        })


        // 课堂案例改写
        Vue.directive('focus',{
                inserted:function(el){
                        el.focus();
                }
        })

        Vue.directive('color',{
                // 当前指令所在元素插入到父节点中执行
                inserted:function(el,binding){
                        // this.el.style.color = this.vm[this.expression];
                        console.log(binding);
                        // el是当前指令所在的DOM元素对象
                        // binding.value 是指令后面所跟表达式的值
                        // binding.expression 是指令后面所跟的表达式

                        // el.style.color = binding.value;

                        setTimeout(function(){
                                el.style.color = this.vm[binding.expression];
                        },0) 

                }
        })

### 自定义元素指令
> 在vue2.0中推崇的是组件写法，所以不再有自定义元素指令

        Vue.elementDriective('指令名称'{
                bind：function(){
                     // 在函数内部完成该指令的逻辑   
                }
        })

## vue-resource ajax请求
### get请求

> http://www.lovegf.cn:8899/api/getprodlist // 获取数据

        // 使用当前vue实例调用get方法
        this.$http.get('url',{是需要给后台发送的数据}.then(function(res){
                // res.body 是获取到的响应数据
        })

### post请求

> http://www.lovegf.cn:8899/api/addproduct // 提交数据

        this.$http.post('url',{是需要给后台发送的数据},{emulateJSON:true}).then(function(res){
                // res.body 是获取到的响应数据
        })

### jsonp请求

> http://www.lovegf.cn:8899/api/jsonp

        // 使用当前vue实例调用get方法
        this.$http.jsonp('url(此URL必须支持jsonp请求)',{是需要给后台发送的数据}.then(function(res){
                // res.body 是获取到的响应数据
        })

> 为什么存在jsonp?
>  浏览器存在同源策略：在浏览器发送请求的过程中,会检查当前发送请求的URL地址和当前发送请求所在的网页地址是否同协议
> 同域名.同端口，如果三者一致，则请求可以发送成功,如果不一致，则请求不能发送.

> 为了保证在跨域的情况下也能发送,则需要使用jsonp.

> jsonp 原理?(利用script标签src属性可自动发送请求且不受同源策略限制的特性)
> 1. 会动态创建一个script标签
> 2. 将发送的URL地址拼接到script的src属性中,然后在URL地址后面拼接上一个回调函数名fn
> 3. 后台接收到请求会去检查当前请求是否是jsonp请求,如果是,那么会将需要返回给客户端的数据进行封装,将数据放到回调函数的参数中 echo fn + '('需要返回的数据')',然后返回给客户端
> 4. 客户端接收到数据后,会把字符串转成js代码去执行,相当于去掉用该函数,那么真实数据就在函数的参数中
> 5. 删除script标签   

> CORS跨域:Cross Origin Resource Sharing 跨域资源共享
> CORS跨域只需要后台在请求头中添加允许跨域的信息即可,客户端不需要修改任何代码

        res.header("Access-Control-Allow-Origin", "*");

## Vue生命周期

> Vue 实例有一个完整的生命周期，也就是从开始创建、初始化数据、编译模板、挂载Dom→渲染、更新→渲染、卸载等一系列过程，我们称这是 Vue 的生命周期。通俗说就是 Vue 实例从创建到销毁的过程，就是生命周期。

> 钩子函数:一个系统内置的一批函数,这些函数会在系统运行的某一阶段或者某一时间点自动触发,进行事件的处理后又接着执行
后续任务

        beforecreate : 可以在这加个loading事件，在加载实例时触发 
        created : 初始化完成时的事件写在这里，如在这结束loading事件，异步请求也适宜在这里调用
        mounted : 挂载元素，获取到DOM节点
        updated : 如果对数据统一处理，在这里写上相应函数
        beforeDestroy : 可以做一个确认停止事件的确认框

## vue1.0和vue2.0区别总结

### v-for的区别

        1. vue1.0中标识循环遍历的每一项使用的是`track-by='$index'`
           vue2.0中使用`:key= 'index'`,
           vue1.0中有`$index`这个特殊属性,
           vue2.0中没有.

        2. vue1.0中遍历数组写法`(index,value) in list`
           vue2.0中是`(value,index) in list`

        3. vue1.0遍历对象写法`(key,value) in obj`
           vue2.0中是`(value,key) in obj`

### 过滤器

        1. vue1.0中有系统提供的过滤器,如 json uppercase ... 
           vue2.0中全部去除系统过滤器

        2. vue1.0和vue2.0中都有自定义过滤器

        - 自定义全局过滤器
        `Vue.filter('过滤器名称', function (管道符号|左边参数的值,其他参数1,其他参数2,....) {
                 return 对管道符号|左边参数的值做处理以后的值
        })`
        - 自定义私有过滤器(定义在 VM中的filters对象中的所有过滤器都是私有过滤器)
        new Vue({
         ...
         filters:{
             '过滤器名称':function(管道符号|左边参数的值,其他参数1,其他参数2,....){
                return 对管道符号|左边参数的值做处理以后的值
             }
         }
     });


### 过度动画

        1、vue1.0中，需要在实现过渡动画的元素上使用 transition 特性，示例：
        <div v-if="show" transition="my-transition"></div> ,my-transition 可以有程序员自定义名称

        2、 vue2.0中 transition特性的写法变成了 <transition></transition>的写法    
        <transition name="fade">
                <p v-if="show">hello</p>
        </transition>

        3. 动画钩子函数

        vue1.0中动画钩子函数
        - 过渡动画进入
        beforeEnter:function(el){}      过渡动画进入之前，一般在这个方法中定义目标元素的初始位置
        enter:function(el,done){}       过渡动画进入中，在这个方法中定义目标元素的结束位置
        afterEnter:function(el){}       过渡动画结束后，通常在这个方法里面重置初始值
        enterCancelled:function(el){}   取消过渡动画时被调用

        - 过渡动画离开
        beforeLeave:function(el){}      动画离开之前触发    
        leave:function(el){}            过渡动画进入中触发
        afterLeave:function(el){}       过渡动画离开结束后
        leaveCancelled:function(el){}   取消过渡动画时被调用

        vue2.0中动画钩子函数
        - 过渡动画进入
        before-enter      过渡动画进入之前，一般在这个方法中定义目标元素的初始位置
        enter             过渡动画进入中，在这个方法中定义目标元素的结束位置
        after-enter       过渡动画结束后，通常在这个方法里面重置初始值
        enter-cancelled   取消过渡动画时被调用

        - 过渡动画离开
        before-leave      动画离开之前触发    
        leave             过渡动画进入中触发
        after-leave       过渡动画离开结束后
        leave-cancelled   取消过渡动画时被调用

## 组件

### 组件的创建

#### 组件定义方式一

        // 1. 定义组件
        var `组件名称` = Vue.extend({
                template:'模板(一般为HTML结构)'
        });

        // 2. 注册组件
        Vue.component('login',login);

#### 组件的定义方式二

        Vue.component(`组件名称`,{
	        template:'模板(一般为HTML结构)'
        });

#### 组件的定义方式三

        <template id = 'account'>
                // 书写HTML结构
        </template>

        Vue.component('account',{
                // #account 是template标签的ID
                template:'#account',
        });

### 组件的使用

        // 将组件名称当做HTML标签使用,显示的内容就是组价定义时模板里面的内容
        <account></account>

        Vue.component('account',{
                // #account 是template标签的ID
                template:'#account',
        });

### 子组件的定义和使用

> 1. 子组件需要在父组件中的`components`属性里面进行定义,
> 2. 子组件需要在父组件的模板中使用

        // 父组件模板
        <template id = 'account'>
                // 子组件只能在父组件模板中使用
                <login></login>
        </template>

        Vue.component('account',{
                // #account 是template标签的ID
                template:'#account',
                ...
                // 在components属性内部定义子组件
                components:{
                        // 子组件名称:子组件对象
                        `login`:{
                                template:'<div>子组件模板或者模板ID<abc></abc></div>',
                                components:{
                                        'abc':{
                                                template:"<h1>这是login的子组件</h1>"
                                        }
                                }
                        }
                },
                data:function(){
                        retunr {
                                msg:'我是组件内部定义的数据'
                        }
                },
                methods:{
                        fn:function(){
                                console.log(this.msg);
                        }
                }
        });

### 组件中的注意事项

> 1. `new Vue()` 也是一个组件(通常称作根组件),这个组件的模板就是该实例的托管区域;一个组件也是一个vue实例;
使用`Vue.component` 定义出来的组件 是根组件 `new Vue()` 实例的子组件

> 2. 组件内部定义数据`data`属性是一个方法,方法内部返回一个对象

> 3. 子组件定义在父组件`components`属性内部,子组件的使用必须写在父组件模板中

> 4. `Vue2.0` 组件模板内部的代码必须写在一个根元素内部(通常都是用一个div包裹所有其他元素)

> **没有根元素时错误信息** `Component template should contain exactly one root element`

- 模板书写时按照以下格式

        <template>
                <div>
                // 书写HTML结构
                </div>
        </template>

- vue2.0中`sub`不能作为组件名称
- 组件名称首字母如果是大写字母,使用时使用小写字母;组件名称中间某个字符是大写字母,使用时使用连字符-

        <div id='app'>
                <user-login></user-login>
        <div>

        new Vue({
                el:'#app',
                components:{
                        "UserLogin":{
                                template:'<h1>我的名字包含大写字母</h1>'
                        }
                }
        })

## 组件传值
### 父组件向子组件传值

> 1. 在子组件内部定义一个props属性，然后在这个属性内部定义变量用来接收父组件传过来的数据

> 2. 在父组件中使用子组件时，在子组件上面绑定一个和子组件内部props里面定义的变量同名的属性

> 3. 把父组件data中定义的数据(需要传递的数据) 作为 子组件绑定的属性的属性值进行传递

        子组件sonComponent
        父组件fatherComponent

        sonComponent:

        1. 定义props数组对象,数组对象中的属性用于接收父组件传递过来的数据

        new Vue({
                props:['id'], // id即为用于接收父组件传递过来数据的属性
        })

        fatherComponent:

        1. 使用子组件时绑定子组件props中定义的属性进行传值

        // 这里的id需要和子组件props中定义的属性一致
        <sonComponent v-bind:id = '需要传递的数据'></sonComponent>
        

### 子组件向父组件传值

> **发布 - 订阅者模式**

> 1. 在子组件中触发 this.$emit('消息名称','消息所携带的数据') 进行消息的发布

> 2. 在父组件中使用子组件时 注册一个和 ‘消息名称’ 一致的事件,同时给定一个事件处理函数,这个事件处理函数是在父组件中进行定义的.

> 3. 消息所携带的数据就父组件中定义的事件处理函数的参数中

        子组件sonComponent
        父组件fatherComponent

        sonComponent:

        1. 发布事件

        this.$emit('事件名称','需要传递的数据');

        2. 事件的触发

        send(){
                this.$emit('事件名称','需要传递的数据')
        }

        fatherComponent:

        1. 订阅事件

        // 父组件中使用子组件(`事件名称`和子组件中`this.$emit('事件名称','需要传递的数据')`里的事件名称一致)
        <sonComponent v-on:'事件名称' = '事件处理函数'></sonComponent>

        2. 获取数据

        methods：{
                事件处理函数:function(data){
                        // data 就是子组件sonComponent中需要传递的数据
                }
        }


### 非父子组件传值

> 使用**event bus(事件总线)**：利用一个共享的vue实例对象来进行数据的传递. 同时采用的是 **发布-订阅者模式**

        componentA  componentB进行数据传递(B->A)

        **定义一个公有的Vue实例,保证两个组件都能够使用,一般在一个单独的js文件中导出一个Vue实例,
        然后在componentA和componentB组件中导入该实例进行使用**

        export default var vm = new Vue();

        componentB：(B组件时需要传递数据的组件)

        1. 进行事件的发布(注册)

        vm.$emit('事件名称','需要传递的数据')

        2. 事件的触发(用于发布事件)

        send(){
                vm.$emit('事件名称','需要传递的数据')
        }

        componentA：(A组件是接收数据的组件)

        1. 订阅事件

        vm.$on('事件名称',function(data){
                // 此处的data就是 发布组件中传递过来的数据
        })

## v-el和v-ref

        vue1.0中使用v-el获取DOM元素 使用v-ref获取组件
        vue2.0中统一使用ref属性获取DOM元素和组件

        <div ref='mydiv'></div>
        <account ref='myaccount'></account>
        // 获取DOM this.$refs.mydiv
        // 获取组件 this.$refs.myaccount

## vue-router的使用

> 1. 使用<router-link to='路径'></router-link>指定点击元素后需要跳转的路径
> 2. 在创建出来的VueRouter对象中定义路由规则,路由规则就是**规定一个路径对应哪一个组件**
> 3. 使用<router-view></router-view>进行占位,作用就是将来每一个组件都会被渲染到当前这个位置

        new VueRouter({
                routes:[
                     // 一个对象就是一个路由规则
                     // path后面的路径需要和router-link中to属性 路径一致
                     // 组件对象需要提前定义
                     {path:'路径',component:组件对象}              
                ]
        })

### 基本步骤

        1. 使用`router-link`定义跳转路径
        <router-link to="/account">账号</router-link>
        
        2. 使用`router-view`进行占位,以便于显示组件
        <router-view></router-view>

        3. 定义跳转路径对应的需要显示的组件
        // 实际项目中一个文件就是一个组件,所以应该是直接引入组件
        var account = Vue.extend({
                template:'<div><h1>账号</h1><router-view></router-view></div>'
        });
         var login = Vue.extend({
                template:'<div><h1>登录</h1></div>'
        });

        4.实例化路由对象并配置路由规则
        var router = new VueRouter({
                routes:[
                        {
                                path:'/account',
                                component:account,
                                children:[
                                        {
                                                path:'login',
                                                component:login,
                                        }
                                ]
                        },
                ]
        });

        5. 开启路由
        new Vue({
                el :'#app',
                router : router //启动路由对象
        });

### 嵌套路由注意事项

> 1、定义路由规则清单的时候,使用`children`属性定义子路由,`children`下面的子路由规则path中的文本字符串是不需要加/的，否则无效

> 2、嵌套路由的上层路由中的path要加 /，并且`template`中要增加`<router-view></router-view>`

> 3、修改`<router-link to="/上层路由path/子路由path">`

### 路由传参

> 1. 修改路由规则为带有参数形式`{path:'/路径/:参数名称',component:组件对象}`

> 2. 使用`<router-link to = '/路径/参数值'><router-link>`进行传参,将需要传递的值放到路径后面,用/分隔

> 3. 使用this.$router.params.参数名称获取参数值

## watch和computed计算属性的使用

### watch的使用
> `watch`可以监测`data`中的数据变化,然后触发定义的方法执行操作。

        new Vue({
                ...
                data:{
                        name:'zxx'
                },
                watch:{
                        // 监控的是data中已经定义过的数据
                        'name':function(newval,oldval){
                                // 只要将来name值发生变化,就会自动触发这个方法
                                // newval 表示name属性变化后的值 oldval表示变化前的值
                        },
                        /*特殊:watch可以监控路由对象*/
                        '$route':function(newroute,oldroute){
                                // 只要vue中集成了vue-router,watch就可以监控路由的变化
                        }
                }
        })

### computed的使用

> 使用`computed`定义的属性就相当于`data`中定义的数据属性一样,只不过`computed`里面定义的属性值是通过计算得到的。

        new Vue({
                ...
                data:{
                        name:'zxx',
                        age:18
                }
                computed:{
                        // 定义一个计算属性info
                        info:function(){
                                // 进行计算,然后返回 
                                // 计算属性的值就是这里返回的值 'zxx18'
                                // 如果将来this.name和this.age任何一个数据发生变化,都会重新触发这个函数进行计算
                                return this.name + this.age
                        }
                }
        })
        
# webpack 的学习

## webpack 和 gulp 的区别

> gulp是工具链、构建工具,可以配合各种插件做js压缩,css压缩,less编译 **替代手工实现自动化工作**

1. 构建工具

2. 自动化

3. 提高效率用

> webpack是文件打包工具,可以把项目的各种js文、css文件等打包合并成一个或多个文件,**主要用于模块化方案，预编译模块的方案**

1. 打包工具

2. 模块化识别

3. 编译模块代码方案用

<img src='http://img.blog.csdn.net/20160629120502503?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQv/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'>

## npm相关指令

        全局安装 -g：
        全局安装的包位于Node.js环境的node_modules目录下，全局安装的包一般用于命令行工具
        C:\Users\LEO\AppData\Roaming\npm

        本地安装：
        本地安装的包在当前目录下的node_modules里面，本地安装的包一般用于实际的开发工作

        npm常用的命令：
        1、安装包（如果没有指定版本号，那么安装最新版本）
        npm install -g 包名称 (全局安装)
        npm install 包名称 (本地安装)

        2、安装包的时候可以指定版本
        npm install -g 包名称@版本号

        3、卸载包
        npm uninstall -g 包名

        4、更新包（更新到最新版本）
        npm update -g 包名

        5、查看包信息
        npm info 包名

        开发环境（平时开发使用的环境）
        生产环境（项目部署上线之后的服务器环境）
        --save 向生产环境添加依赖 dependencies
        --save-dev 向开发环境添加依赖 DevDependencies 

## 安装webpack

        1. 全局安装 nrm: `npm install nrm -g`
        2. 查看镜像源 `nrm ls`
        3. 切换淘宝镜像源 `nrm use taobao`
        4. 全局安装webpack `npm install webpack@1.14.0 -g`

## webpack 进行代码打包

        导出一个模块 `module.exports = 需要导出的对象`

        导入一个模块 `var 模块名 = require(文件路径)`

        webpack 打包命令 
        `webpack 需要打包的文件名 输出的文件名`

        例如:
        `webpack main.js build.js`
        
## webpack 配置文件  

        1. 默认配置文件名称webpack.config.js

        module.exports = {
                entry:'*需要打包的文件*' // 路径+文件名 一般为 ./src/xxx.js
                output:{
                        path:'*输出文件的路径*' // 绝对路径 使用__dirname + 路径
                        filename:`*输出文件的名称*` // 一般都为build.js/bundle.js
                }
        }

        2. 使用webpack进行打包
                - 如果是默认配置文件 则直接在命令行中 输入 `webpack`
                - 如果是其他改过名字的配置文件 则使用 `webpack --config 配置文件名`


## webpack loader的使用

> loader：预处理器。在js代码执行之前需要执行的一些处理。

### css-loader

> css-loader 是进行css解析，能够使浏览器正常识别js文件中导入的 css 文件


        1. 初始化package.json
        npm init

        2. 安装css-loader以及style-loader
        npm install style-loader css-loader --save-dev

        3. 在webpack.config.js文件中进行配置

                module:{
                        loaders:[
                                {
                                        test: /\.css$/,
                                        loader:'style-loader!css-loader'
                                }
                        ]
                }

### sass-loader 的使用

> sass-loader是进行scss文件的解析

        1. 安装sass-loader
        npm install node-sass sass-loader style-loader css-loader --save-dev

        2.配置sass-loader
         loaders:[
                        {
                                test: /\.scss$/,
                                loader:'style-loader!css-loader!sass-loader'
                        }
                ]

### less-loader 的使用

> less-loader是进行less文件的解析

        1. 安装scss-loader
        npm install less less-loader style-loader css-loader --save-dev

        2.配置scss-loader
         loaders:[
                        {
                                test: /\.less$/,
                                loader:'style-loader!css-loader!less-loader'
                        }
                ]

### url-loader 的使用

> url-loader是进行url资源的解析

        1. 安装url-loader
        `npm install file-loader url-loader --save-dev`

        2.配置url-loader
         loaders:[
                        {
                                test: /\.(png|jpg|gif|ttf)$/,
                                loader:'url-loader!limit=20000&name=images/[hash:8].[name].[ext]'
                                // limit单位是字节 1kb = 1024b(字节)
                                // 对于比较小的图片资源可以使用limit进行限制 
                                // 小于limit值转换成base64字符串内嵌到js代码中
                                // 大于limit值的图片才转成URL进行网络请求
                        }
                ]

### webpac-dev-server的使用

        1. 安装webpack-dev-server
 
        npm install webpack@1.14.0 webpack-dev-server@1.16.0 --save-dev

        2. 安装自动生成HTML文件的插件
        npm install html-webpack-plugin@2.28.0 --save-dev

        3. 修改package.json文件

                "scripts": {
                        "dev": "webpack-dev-server --hot --inline --open --port 5008"
                },

        4. 配置webpack.config.js中的内容

        - 引入html-webpack-plugin
                `var htmlWP = require('html-webpack-plugin');`
        - 在modul.exports中加入
                 plugins:[
                        new htmlWP({
                                title: '首页',  //生成的页面标题
                                filename: 'index.html', //webpack-dev-server在内存中生成的文件名称，自动将build注入到这个页面底部，才能实现自动刷新功能
                                template: 'template.html' //根据template.html这个模板来生成(这个文件程序员自己书写)
                        })
                ]

        5. 运行 npm run dev

### babel-loader的使用

> babel-loader是用来将es6语法转换成es5语法

        1. 安装babel-loader
        `npm install babel-core@6.24.0 babel-loader@6.4.1 babel-preset-es2015@6.24.0 babel-plugin-transform-runtime@6.23.0  --save-dev`

        2. 配置webpack.config.js文件

        {
                test: /\.js$/,  // 将.js文件中的es6语法转成es5语法
                loader:'babel-loader',
                exclude:/node_modules/ // 排除node_modules文件夹下的js文件不用被转换
        }

        3. 配置babel的转码规则

        babel:{
                presets:['es2015'],  // 配置将es6语法转换成es5语法
                plugins:['transform-runtime'] // 用来解析vue文件
        }

## webpack解析vue文件

### 安装vue-loader解析.vue文件

        1. 安装相关包
        `npm install vue vue-loader@11.3.4 vue-template-compiler babel-plugin-transform-runtime@6.23.0 --save-dev`

        2. 配置webpack.config.js文件
        {
                test: /.vue$/,  // 解析 .vue 组件页面文件
                loader:'vue-loader' 
        }

### .vue文件基本代码结构

> 一个.vue文件就是一个vue的组件

        // 1. 组件模板
        <template>
                <div>
                        <!-- 1.0 template主要是放html元素的（html的页面结构） -->
                        <span v-text="msg" class="red"></span>
                </div>
        </template>

        // 2. 负责导出vue的对象
        <script>
                // 负责导出 .vue这个组件对象(它本质上是一个Vue对象,所以Vue中该定义的元素都可以使用)
                export default{  // es6的导出对象的写法
                        data(){  //等价于 es5的 data:function(){
                                return {
                                        msg :'hello vuejs'
                                }
                        },
                        methods:{
                                
                        },
                        created(){

                        }
                }
        </script>

        // 3. 书写组件内部的样式
        <style scoped>
        // scoped表示这个里面写的css代码只是在当前组件页面上有效，不会去影响到其 他组件页面
                .red{
                        color: red;
                }
        </style>

### 项目入口文件main.js中渲染组件

        // 1.0 导入vue核心包
        // 凡是使用npm安装的包 引入的时候都不需要写相对路径 只需要写包名即可
        import Vue from 'vue';

        // 2.0 导入App.vue的vue对象
        import App from './App.vue';

        // 3.0 利用Vue对象进行解析渲染
        new Vue({
                el:'#app',
                render:function(create){return create(App)} //es5的写法
                // render:c=>c(App)  // es6的函数写法 =>：goes to
        });

## 使用webpack以及npm创建项目

        1. 创建项目文件夹

        2. 创建npm的配置文件package.json

        npm init -y

        3. 创建webpack配置文件(webpack.config.js)

        4. 根据项目需求安装所需要使用的模块

        npm install 包名 --save-dev
        
# 其他

## ES6语法使用总结

        1、对象的写法

                es5中对象： {add:add,substrict:substrict}
                es6中对象： {add,substrict}  注意这种写法的属性名称和值变量是同一个名称才可以简写，否则要想es5那样的写法,例如： {addFun:add}

        2、在对象中的方法的写法

                es5中对象： {add:function(){},substrict:function(){}}
                es6中对象： {add(){},substrict(){}}

        3、对象的导出写法

                es5两种形式：
                1、module.exports = fucntion (){};
                2、exprots.add =  fucntion (){};

                es6中写法：
                1、export default{
                add(){}
                }
                2、export fucntion add(){} 相当于 将add方法当做一个属性挂在到exports对象

        4、对象的导入

                es5: var add  = require('./calc.js');
                es6:
                如果导出的是：export default{ add(){}}
                那么可以通过  import obj from './calc.js'

                如果导出的是：
                export fucntion add(){} 
                export fucntion substrict(){} 
                export const PI=3.14

                那么可以通过按需加载 import {add,substrict,PI} from './calc.js'

        5、es6中的箭头函数的写法

                箭头的演变过程：
                //需求：利用函数实现倒序排列
                [2,1,3].sort(function(x,y){return y - x;});

                //用箭头函数实现 =>读 goes to
                [2,1,3].sort((x,y)=>{return y - x;});
                [2,1,3].sort((x,y)=> {x++;y++; y - x;});
                [2,1,3].forEach(x=> {console.log(x)});

## vue-router集成

        1. 安装vue-router
        `npm install vue-router --save`

        2. App.vue中书写跳转链接

        <router-link to="/login">登录</router-link>
        <router-link to="/register">注册</router-link>

        <!-- 路由占位符 -->
        <router-view></router-view>

        3. main.js中集成vue-router并配置路由规则

        // 1. 导入vue-router
        import vueRouter from 'vue-router';
        // 2. 将vueRouter对象绑定到Vue对象上
        Vue.use(vueRouter);

        // 3. 导入路由规则对应的组件对象
        import login from './components/account/login.vue';
        import register from './components/account/register.vue';

        // 4.定义路由规则
        var router1 = new vueRouter({
                routes:[
                        {path:'/login',component:login}, 
                        {path:'/register',component:register}
                ]
                });

        // 5. 利用Vue对象进行解析渲染
        new Vue({
                el:'#app',
                // 使用路由对象实例
                router:router1,
                render:c=>c(App)
        });


## mint-ui的使用

        1. 安装mint-ui
        npm install mint-ui --save

        2. 在项目入口文件main.js中配置mint-ui
        - 导入mint-ui
        import mint from 'mint-ui'
        - 在vue中注册mint-ui
        Vue.use(mint)

        3. 使用csscomponents
        - 在main.js中导入css样式
        import 'mint-ui/lib/style.min.css';
        - 在vue的组件中使用mint-ui提供的控件

        4. 使用jscomponents
        - 在vue组件内部的script标签中按需导入需要使用的控件
        import {js组件名称} form 'mint-ui' 
        - 在js代码中使用mint-ui提供的控件

## git 常用命令

        git config --global user.name "用户名" 
        git config --global user.email "邮箱账号" 
 
        // 创建版本库
        git init
        // 添加文件到缓存区
        git add ./
        // 提交信息
        git commit -m '说明信息'
        // 推送到远程仓库
        git push -u orign master

        // 查看仓库状态
        git status
        // 查看提交记录
        git log --oneline
        // 查看版本切换记录
        git reflog
        // 版本回退
        git reset --hard 版本号

        // 回到主分支
        首先git checkout -b temp
        其次git checkout master

## 项目学习

        1. 克隆我的代码
        `git clone https://git.oschina.net/UniverseKing/vue_system.git`

        2. 将版本进行回退到项目框架搭建位置
        git log --oneline
        git reset --hard 版本号

        3. 复制回退后的代码文件(不需要.git文件夹)到自己的项目文件夹里面

        4. 在自己的项目文件夹里面执行`npm install`

        5. 开始功能开发

## vscode 代码片段

> 文件 - 首选项 - 用户代码片段 - 搜索vue(选择vue) - 将以下代码复制到`{}`中

	"Create vue template": {
        "prefix": "vuec",
        "body": [
            "<template>",
            "  <div id='tmpl'>",
            "  </div>",
            "</template>",
            "<script>",
            "export default {",
            "  name: \"${1:component_name}\",",
            "  data () {",
            "    return {",
            "    };",
            "  }",
            "}",
            "</script>",
            "<style lang=\"${2:css}\" scoped>",
            "</style>"
        ],
        "description": "Create vue template"
    }

## vetur插件配置

> 先安装好vetur插件。然后 文件 - 首选项 - 设置 - 用户设置 - 将以下代码复制到`{}`中

        "emmet.syntaxProfiles": {
                "vue-html": "html",
                "vue": "html"
        }

# 补充
## 大型复杂项目中数据状态管理

> 复杂项目中数据的传递和管理一般不会用到`event bus`,因为如果订阅者过多,无法准确的知道数据的流向.所以对于大型项目应该使用`Vue`提供的`vuex`进行数据管理

> 官方文档https://vuex.vuejs.org/zh-cn/

        1. 安装vuex
        npm install vuex --save

        2. main.js中引入安装
        import Vuex from 'vuex';
        Vue.use(Vuex);

        3. 配置vuex
        //Vuex配置
        const store = new Vuex.Store({
                // state类似vue实例中的data 用来存放数据
                state: {
                        // 可以设置一些需要全局使用的数据
                        username:'zxx'
                },
                // mutations类似vue实例中的methods
                mutations: {
                        // 用来处理数据 比喻数据删除更新等操作
                        // 第一个参数state是固定写法 第二个参数表示的是需要修改成的数据
                        update(state,name){
                                state.username = name;
                        }
                }
        })

        3. 组件中通过this.$store使用

                console.log(this.$store.state.username);

        4. 调用mutations方法更新数据

                // 第一个参数是 mutations 中定义的对应的方法名 第二个参数是需要更新的数据
                // 具体更新逻辑在update方法中实现
                this.$store.commit('update','lxy');调用update方法更新用户名
        
        5.组件内监视state中的数据更新

                import { mapState } from 'vuex';

                // mapState可以将vuex实例state中定义的属性 映射成为当前组件中的计算属性
                // 同时可以保证在计算属性的方法体中可以使用state中的属性
                computed: mapState({
                        username: state => state.username
                        // username:function(state){return state.username};
                })

## vue-cli命令行工具搭建spa应用

        1、在cmd命令面板中执行：npm install --global vue-cli 全局安装 vue-cli

        2、利用：vue init webpack projectName(自定义项目名称) 创建一个基于webpack模板的新项目

        3、进入到项目名称文件夹中执行 npm install 安装项目所需依赖

        4、运行 npm run dev 运行项目

## vue项目引入公共js文件

        > 如果需要将公共js文件引入到main.js文件中使用,可以引入后将模块注入到Vue的原型中

        // main.js
        import common from 'common.js';
        Vue.prototype.$common = common;
        // Object.definePrototype(Vue.prototype, '$common', { value: common });

        // 其他文件使用
        this.$common就是引入的common对象

## vue插件开发

        // common.js文件
        var obj = {
                apidomain:'http://www.lovegf.cn:8899', // 所有数据请求的根域名地址
        }
        export default {
                install: function(Vue) {
                        Object.defineProperty(Vue.prototype, '$common', { value: obj });
                }
        }

        // main.js文件
        import common from 'common';
        Vue.use(common);

        // 其他文件使用
        this.$common

## vue-router路由拦截

        // 1. 设置路由规则时进行拦截
        {
			path: '/userinfo',
			component: userinfo,
			meta: {
				requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
			},
			beforeEnter: (to, from, next) => {
				if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
					if (getCookie('session')) {  // 通过vuex state获取当前的token是否存在
						next(); // 存在就进入userinfo
					}
					else {
						next({
							path: '/login',
							query: { redirect: to.fullPath }  // 将跳转的路由path作为参数，登录成功后跳转到该路由
						})
					}
				}
				else {
					next();
				}
			}
		}

        // 2. 登录成功后跳转路由
        this.$router.push('/userinfo');
        
## vue-router路由模式

        var router = new vueRouter({
                // 设置路由模式
	        mode: 'hash',
                // hash带锚点 history不带锚点
                // hash可以将页面放到其他浏览器或标签打开 history不可以(服务端渲染解决)
        })

## SPA应用性能优化

### 服务端渲染

> 问题:1.单页面应用不利于SEO,因为所有HTML文档都是由js动态生成的。2.首次加载速度过慢。

### 分离css

        1. 安装插件
        npm install extract-text-webpack-plugin@1.0.1 --save-dev

        2. 修改css-loader配置
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")

        3. plugin配置中使用插件
        new ExtractTextPlugin('app.css'),

### 分离第三方包

        1. 引入webpack
        var webpack = require('webpack');

        2. 修改入口文件
        entry: {
                app: path.resolve(__dirname, 'src/main.js'),
                // 需要分离的第三方包名写在数组中
                vendors: ['vue', 'vue-resource', 'vue-router', 'vuex', 'mint-ui', 'moment', 'vue-preview']
        },

        3. plugin中配置插件
        // 分离第三方包插件
        new webpack.optimize.CommonsChunkPlugin({
                name: 'vendors',
                filename: 'vendors.js'
        }) 

### 代码压缩

        1. html代码压缩
        new htmlwp({
                title: '首页',  //生成的页面标题<head><title>首页</title></head>
                filename: 'index.html', //webpack-dev-server在内存中生成的文件名称，自动将build注入到这个页面底部，才能实现自动刷新功能
                template: 'template.html', //根据index1.html这个模板来生成(这个文件请程序员自己生成)
                // 代码压缩
                minify: {
                        // 删除注释
                        removeComments: true,
                        // 删除空格
                        collapseWhitespace: true,
                        // 删除空格缩进
                        removeAttributeQuotes: true
                }
        }),

        // 2. js代码压缩混淆插件
        new webpack.optimize.UglifyJsPlugin({
                beautify: false,
                mangle: {
                        screw_ie8: true,
                        keep_fnames: true
                },
                compress: {
                        warnings: false,
                        screw_ie8: true
                },
                comments: false
        }),
        // 3. 删除警告
        new webpack.DefinePlugin({
        'process.env': {
                // 注意字符串被引号引起来
                NODE_ENV: '"production"'
        }
        })

# 扩展
- 现在流行的三大框架，angular,vue,react;希望老师从具体应用的角度，介绍一下它们的优劣，长处短处，应用范围，前景，性能等等。

        Angular的适用领域相对窄一些，React可以拓展到服务端，移动端Native部分，而Vue因为比较轻量，还能用于业务场景非常轻的页面中

        // react && vue
        使用 Virtual DOM
        提供了响应式（Reactive）和组件化（Composable）的视图组件。
        将注意力集中保持在核心库，伴随于此，有配套的路由和负责处理全局状态管理的库。

        angular 
        框架体系非常大,面面俱到
       
        vue: 双向数据绑定 观察者模式
        angular: 双向数据绑定 脏值检测
        react : 单向数据流

        angular-cli:

        npm i angular-cli -g
        ng new project
        ng serve

- vue能不能设置全局的方法，让每个组件都能调用那个方法

        1. 在一个js文件中书写方法进行导出

        export function fn(){console.log('我是每一个组件都需要使用的方法')};

        2. 在项目入口文件main.js中引入该js文件,并将该方法绑定到Vue的原型中

        import fn from './xxx.js'
        Vue.prototypr.fn = fn;

        3. 项目中的.vue文件,即其他组件都可以使用该方法

        this.fn(); // 我是每一个组件都需要使用的方法

- 项目开始的配置单

        https://git.oschina.net/UniverseKing/vue_coding.git

- 如果想写一些原生的js 的话不知道该怎么写，还有如果用less写css的话怎么引入各组件里面？

        1. 原生js依旧写到单独的js文件中,然后对其内容进行导出,在其他组件中使用。

        2. 将原生js写到.vue组件中的script标签中

- 各个包的作用以及怎么用跟我们好好把思路帮我们整理一下。

        Vue: 框架核心
        webpack: 用来对模块进行打包的一个工具(打包就是一个解析,编译的过程,解析的就是浏览器不能识别的语法)
        webpack-dev-server: 一个webpack的插件,内置了express的node服务器,用于在开发阶段编译代码,实现热更新加载等功能
        vue-resource: 实现vue的ajax请求库
        vue-router: 实现 vue 的路由库
        vuex: vue状态(数据)管理库
        babel: 语法解析器,可以将很多浏览器不能识别的语法转换成可识别的es5语法.es6->es5 , vue->es5 
        html-webpack-plugin:一个webpack的插件,用于webpack编译时自动根据模板生成一个index.html文件

- vue axios请求跟vue-resource有什么区别？

        axios使用:

        1. 安装 axios
        npm install axios --save

        2. 因为axios不支持Vue.use()方法,所以为了所有组件能够使用,需要绑定到Vue原型中
        import axios from 'axios';
        Vue.prototype.$http = axios

        3. 发送请求参照vue-resource
        // get请求
        this.$http.get(url).then(function(res){
                // 返回的响应数据在res.data属性中
                console.log(res.data);
                // 回调函数内部的this不是当前数据请求方法的调用者
                // 通常内部this是window 在node平台 内部this是undefined
        })

        // 一般使用箭头函数写法
        this.$http.get(url).then((res)=>{
                console.log(res.data);
        })

        // post请求(Content-Type:application/x-www-form-urlencoded 时需要配合qs.stringify使用)
        npm install qs --save;
        import qs from 'qs';
        this.$http.post(url,qs.stringify({数据}).then(function(res){
                // 返回的响应数据在res.data属性中
                console.log(res.data);
        })

        也可以参照https://github.com/imcvampire/vue-axios配合使用,支持使用Vue.use()

- 单元测试和持续集成是什么

> https://segmentfault.com/a/1190000000317146
> https://zhuanlan.zhihu.com/p/26701038
> http://www.ruanyifeng.com/blog/2015/09/continuous-integration.html

## 单元测试

        1. 什么是单元（unit）？
        单元就是相对独立的功能模块。一个完整的、模块化的程序，都是由许多单元构成，单元完成自己的任务、然后与其它单元进行交互，最终协同完成整个程序功能。
        2. 什么是测试？测试就检测每一个单元是否符合预期逻辑，判断测试对象对于某个特定的输入有没有预期的输出。
        所以什么是单元测试？就是对构成程序的每个单元进行测试。工程上的一个共识是，如果程序的每个模块都是正确的、模块与模块的连接是正确的、那么程序基本上就会是正确的。所以单元测试就是这么一个概念，一种努力保证构成程序的每个模块的正确性，从而保证整个程序的正确性的方法论。
        3. 具体到实际项目中,需要根据每一个单元所完成功能的不同区书写不同的测试用例

## 持续集成

> 一种软件工程流程，将所有开发人员每天的开发进度，每天集成数次到共用主线（mainline）上.

        基本步骤:

        1. 开发人员根据功能编写代码
        2. 完成某一功能后提交代码，push 到 git 远程仓库
        3. 通过某些工具配置自动拉取新的代码,执行编译命令 npm run build。
        4. 编译成功自动部署到服务器

#### 前端测试框架使用

> Karma +　mocha https://github.com/ccforward/cc/issues/58

> Karma是一个基于Node.js的JavaScript测试执行过程管理工具（Test Runner）。该工具在Vue中的主要作用是将项目运行在各种主流Web浏览器进行测试。

> Mocha是一个测试框架，在vue-cli中配合chai断言库实现单元测试。 


- 移动端中第三方接口的实现，比如支付功能，地图功能等？

        // 百度地图集成
        http://lbsyun.baidu.com/jsdemo.htm?a#a1_2

        // 支付宝集成
        http://blog.csdn.net/qq_34801506/article/details/70906144

- 一般评论的一楼都是固定的，我们做项目的时候1楼是动态的，如果要实现一楼固定该怎么做？

        // 这种逻辑一般由后台处理,一楼如果固定,肯定也是在数据库中就会有特殊字段标明,或者后台根据某一些条件
        // 筛选出一条数据。后台返回数据时就排好序,放到数组第一条就行了

## 登录逻辑

        1. 注册: 前端将用户信息通过注册API接口发送给后台 后台会将数据存储到数据库

        2. 登录: 前端将用户信息通过登录API发送给后台 后台通过在数据库中比对用户名和密码
        如果存在该用户 而且密码正确 就返回登录成功的信息(会携带一个token) 

        // 通常会将token存储到本地 存储到cookie

        进入另一个需要登录的页面:要先判断用户有没有登录(可以通过存储的cookie去进行判断)
        这个页面需要发送数据请求而且需要提供用户信息
        如果不存储到cookie 可以这样调用接口 www.lovegf.cn:8899/api/getlunbo?userId = token

        如果存储到cookie 调用接口就直接www.lovegf.cn:8899/api/getlunbo 后台就可以通过请求头获取到cookie值

        cookie会随着任何请求一起发送给后台(cookie放在请求头中)
        cookie一般用来存储可以标识用户登录状态的信息

        3. 获取用户信息: 将用户信息保存到本地(localStorage) 后续在进入的页面如果需要用到用户信息可以直接读取本地的


## 微信小程序

        1、小程序开发文档https://mp.weixin.qq.com/debug/wxadoc/dev/index.html
        2、小程序设计指南https://mp.weixin.qq.com/debug/wxadoc/design/index.html
        3、小程序开发者工具https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html

---

        npm i i5ting_toc -g
        i5ting_toc -f `文件名称` -o

        vscode中预览markdown Ctrl+shift+v

        var XModule = require("exports-loader?XModule!./file.js")

--- 


笔记访问地址http://192.168.17.37:9999/

vue项目:https://git.oschina.net/UniverseKing/vue_system.git

vue学习资源:https://github.com/UniverseKing/awesome-github-vue

webpack3.0 + vue2.0 项目环境配置 https://git.oschina.net/UniverseKing/vue_coding.git

**注意**: 所有api的域名为：http://182.254.146.100:8899 

**备用**: http://www.lovegf.cn:8899

