<template>
  <component-container :object="object"
                       help-url="https://jmeter.apache.org/usermanual/component_reference.html#Thread_Group">
    <el-form ref="object" :model="object" label-width="140px" label-position="left" size="mini">
      <component-field-set title="在取样器错误后要执行的动作">
        <el-radio-group v-model="object.onSampleError.value">
          <el-radio label="continue">继续</el-radio>
          <el-radio label="startnextloop">启动下一线程循环</el-radio>
          <el-radio label="stopthread">停止线程</el-radio>
          <el-radio label="stoptest">停止测试</el-radio>
          <el-radio label="stoptestnow">立即停止测试</el-radio>
        </el-radio-group>
      </component-field-set>

      <component-field-set title="线程属性">
        <el-form-item label="线程数" prop="numThreads">
          <el-input type="number" v-model="object.numThreads.value"></el-input>
        </el-form-item>
        <el-form-item label="Ramp-Up时间(秒)" prop="rampTime">
          <el-input type="number" v-model="object.rampTime.value"></el-input>
        </el-form-item>

        <el-form-item label="循环数" prop="loops">
          <el-input type="number" v-model="object.loops.value" :disabled="object.continueForever.value">
            <template slot="prepend">
              <el-checkbox v-model="object.continueForever.value" @change="changeContinueForever">无限循环</el-checkbox>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item label-width="0" prop="sameUserOnNextIteration">
          <el-checkbox v-model="object.sameUserOnNextIteration.value">每次迭代使用同一用户</el-checkbox>
        </el-form-item>
        <el-form-item label-width="0" prop="delayedStart">
          <el-checkbox v-model="object.delayedStart.value">将线程创建延迟到需要时</el-checkbox>
        </el-form-item>
        <el-form-item label-width="0" prop="scheduler">
          <el-checkbox v-model="object.scheduler.value" @change="changeScheduler">调度器</el-checkbox>
        </el-form-item>
        <el-form-item label="持续时间(秒)" prop="duration">
          <el-input type="number" v-model="object.duration.value" :disabled="!object.scheduler.value"></el-input>
        </el-form-item>
        <el-form-item label="启动延迟(秒)" prop="delay">
          <el-input type="number" v-model="object.delay.value" :disabled="!object.scheduler.value"></el-input>
        </el-form-item>
      </component-field-set>
    </el-form>
  </component-container>
</template>

<script>
import ComponentContainer from "@/components/ComponentContainer";
import ComponentFieldSet from "@/components/ComponentFieldSet";
import ThreadGroup from "@/jmeter/components/others/thread-group/index";

export default {
  name: "ThreadGroup",
  components: {ComponentFieldSet, ComponentContainer},
  props: {
    object: ThreadGroup
  },
  methods: {
    changeContinueForever(value) {
      if (value === true) {
        if (this.object.loops.value !== undefined) {
          this.object.loops.value = undefined;
        }
      }
    },
    changeScheduler(value) {
      if (value === false) {
        this.object.duration.value = 0;
        this.object.delay.value = 0
      }
    }
  }
}
</script>

<style scoped>

</style>
