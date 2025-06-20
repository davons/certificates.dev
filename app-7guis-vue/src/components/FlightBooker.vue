<script setup lang="ts">
import { computed, ref } from 'vue';

const fligthtType = ref('one-way flight')
const departureDateAt = ref('')
const returnDateAt = ref(departureDateAt.value)

const isReturn = computed(() => fligthtType.value == 'return flight')
const canBook = computed(() =>  !isReturn.value ||
stringToDate(returnDateAt.value) > stringToDate(departureDateAt.value))
const stringToDate = (str: string) => {
    const [y, m, d] = str.split('-')
    return new Date(+y, m-1, +d)
}
const pad = (n, s = String(n)) => {
    return s.length < 2 ? `0${s}` : s
}
const dateToString = (date: Date) => {
 return (
    date.getFullYear() +
    '-' +
    pad(date.getMonth() + 1) +
    '-' +
    pad(date.getDate())
  )
}
departureDateAt.value = dateToString(new Date())
const book = () => {
    console.log(isReturn.value
      ? `You have booked a return flight leaving on ${departureDateAt.value} and returning on ${returnDateAt.value}.`
      : `You have booked a one-way flight leaving on ${departureDateAt.value}.`)
}

</script>


<template>
    <select v-model="fligthtType">
         <option value="one-way flight">One-way Flight</option>
         <option value="return flight">Return Flight</option>
    </select>

    <input type="date" name="departure" id="departure" v-model="departureDateAt"><br/>
    <input type="date" name="return" id="return" v-model="returnDateAt" :disabled="!isReturn">
    <button @click="book" :disabled="!canBook">Book</button>
</template>