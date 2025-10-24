<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Shaderlist from './Shaderlist.vue'
import * as monaco from 'monaco-editor'

const shaderCode = ref(`#version 300 es
precision highp float;
out vec4 outColor;
uniform float u_time;
uniform vec2 u_resolution;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  outColor = vec4(uv.x, uv.y, abs(sin(u_time)), 1.0);
}`)

const canvas = ref<HTMLCanvasElement | null>(null)
let editor = null
let gl: WebGL2RenderingContext | null = null
let startTime = performance.now()


onMounted(() => {
  if (!canvas.value) return
  gl = canvas.value.getContext('webgl2')
  editor= monaco.editor.create(document.getElementById('monaco-container'), {
  value: shaderCode.value,
  language: 'glsl'
});
  renderShader()
  requestAnimationFrame(draw)
})

function compileShader(type: number, source: string) {
  const shader = gl!.createShader(type)!
  gl!.shaderSource(shader, source)
  gl!.compileShader(shader)
  if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
    console.error(gl!.getShaderInfoLog(shader))
    throw new Error('Shader compilation error')
  }
  return shader
}

function createProgram(fragmentShaderSource: string) {
  const vsSource = `#version 300 es
  in vec4 a_position;
  void main() {
    gl_Position = a_position;
  }`

  const vShader = compileShader(gl!.VERTEX_SHADER, vsSource)
  const fShader = compileShader(gl!.FRAGMENT_SHADER, fragmentShaderSource)
  const program = gl!.createProgram()!
  gl!.attachShader(program, vShader)
  gl!.attachShader(program, fShader)
  gl!.linkProgram(program)
  if (!gl!.getProgramParameter(program, gl!.LINK_STATUS)) {
    console.error(gl!.getProgramInfoLog(program))
    throw new Error('Program link error')
  }
  return program
}

let program: WebGLProgram | null = null

function renderShader() {
  try {
    program = createProgram(editor.getValue())
  } catch (e) {
    console.error(e)
  }
}

function runShader() {
  renderShader()
}

function draw(time: number) {
  if (!gl || !program) return
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
  gl.clearColor(0, 0, 0, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)

  const positionBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1, -1,
     1, -1,
    -1,  1,
    -1,  1,
     1, -1,
     1,  1
  ]), gl.STATIC_DRAW)

  const posLoc = gl.getAttribLocation(program, 'a_position')
  const timeLoc = gl.getUniformLocation(program, 'u_time')
  const resLoc = gl.getUniformLocation(program, 'u_resolution')

  gl.useProgram(program)
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
  gl.enableVertexAttribArray(posLoc)
  gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

  gl.uniform1f(timeLoc, (time - startTime) / 1000.0)
  gl.uniform2f(resLoc, gl.canvas.width, gl.canvas.height)
  gl.drawArrays(gl.TRIANGLES, 0, 6)

  requestAnimationFrame(draw)
}
</script>

<style scoped>
canvas { display: block; }
</style>

<template>
  <div class="flex flex-col md:flex-row gap-4">
    <div class="flex-1">
      <Shaderlist/>
      <div id="monaco-container" style="width: 800px; height: 600px; border: 1px solid grey"></div>
      <button
        @click="runShader"
        class="mt-2 bg-indigo-600 text-white px-4 py-2 rounded"
      >
        Run Shader
      </button>
    </div>

    <div class="flex-1 bg-black rounded-lg overflow-hidden">
      <canvas ref="canvas" class="w-full h-96"></canvas>
    </div>
  </div>
</template>