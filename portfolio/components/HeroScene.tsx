'use client'

import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Environment, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

// ── Glow sprite texture ──────────────────────────────────────────
function makeGlowTex() {
  const size = 64
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')!
  const g = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2)
  g.addColorStop(0,   'rgba(255,255,255,1)')
  g.addColorStop(0.25,'rgba(255,255,255,0.85)')
  g.addColorStop(0.6, 'rgba(255,255,255,0.3)')
  g.addColorStop(1,   'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  return new THREE.CanvasTexture(canvas)
}

// ── Fill ellipsoid with points ───────────────────────────────────
function fillEllipsoid(
  cx: number, cy: number, cz: number,
  rx: number, ry: number, rz: number,
  n: number,
  color: THREE.Color,
  positions: number[],
  colors: number[],
  jitter = 0.006,
) {
  for (let i = 0; i < n; i++) {
    const phi   = Math.acos(2 * Math.random() - 1)
    const theta = Math.random() * Math.PI * 2
    const r     = Math.cbrt(Math.random())
    const x = cx + rx * r * Math.sin(phi) * Math.cos(theta) + (Math.random() - .5) * jitter
    const y = cy + ry * r * Math.cos(phi)                   + (Math.random() - .5) * jitter
    const z = cz + rz * r * Math.sin(phi) * Math.sin(theta) + (Math.random() - .5) * jitter
    positions.push(x, y, z)
    colors.push(color.r, color.g, color.b)
  }
}

// ── The particle figure ──────────────────────────────────────────
function SajidFigure({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  const ref    = useRef<THREE.Points>(null!)
  const matRef = useRef<THREE.PointsMaterial>(null!)
  const clock  = useRef(0)

  const { geometry, glowTex } = useMemo(() => {
    const pos: number[] = []
    const col: number[] = []

    const C = {
      skin:  new THREE.Color(0xBE7A56),
      hair:  new THREE.Color(0x0A0603),
      shirt: new THREE.Color(0x4E0B18),
      shirtLight: new THREE.Color(0x631525),
      pants: new THREE.Color(0x0E0E16),
      belt:  new THREE.Color(0x080808),
      buckle:new THREE.Color(0x8B7340),
      watch: new THREE.Color(0x907848),
      beard: new THREE.Color(0x0D0804),
    }

    // ── HEAD ──────────────────────────────────────────────────────
    fillEllipsoid( 0,     1.68,  0.02,  0.205, 0.248, 0.185,  340, C.skin,  pos, col, 0.005)

    // ── HAIR — main dome ──────────────────────────────────────────
    fillEllipsoid( 0,     1.90, -0.02,  0.215, 0.140, 0.185,  190, C.hair,  pos, col, 0.012)
    // sides
    fillEllipsoid(-0.19,  1.74,  0,     0.070, 0.140, 0.090,   75, C.hair,  pos, col, 0.008)
    fillEllipsoid( 0.19,  1.74,  0,     0.070, 0.140, 0.090,   75, C.hair,  pos, col, 0.008)
    // back
    fillEllipsoid( 0,     1.73, -0.18,  0.155, 0.135, 0.040,   65, C.hair,  pos, col, 0.008)

    // ── FACE details ──────────────────────────────────────────────
    // eyebrows (subtle dark)
    fillEllipsoid(-0.075, 1.725, 0.17,  0.045, 0.012, 0.015,   22, C.beard, pos, col, 0.003)
    fillEllipsoid( 0.075, 1.725, 0.17,  0.045, 0.012, 0.015,   22, C.beard, pos, col, 0.003)

    // ── BEARD / MUSTACHE ──────────────────────────────────────────
    fillEllipsoid( 0,     1.44,  0.13,  0.130, 0.080, 0.080,  115, C.beard, pos, col, 0.006)
    fillEllipsoid( 0,     1.52,  0.18,  0.065, 0.022, 0.038,   50, C.beard, pos, col, 0.004)
    // cheek beard (sides)
    fillEllipsoid(-0.12,  1.50,  0.12,  0.045, 0.060, 0.040,   38, C.beard, pos, col, 0.004)
    fillEllipsoid( 0.12,  1.50,  0.12,  0.045, 0.060, 0.040,   38, C.beard, pos, col, 0.004)

    // ── NECK ──────────────────────────────────────────────────────
    fillEllipsoid( 0,     1.47,  0.01,  0.082, 0.095, 0.078,   80, C.skin,  pos, col, 0.004)

    // ── SHIRT COLLAR ──────────────────────────────────────────────
    fillEllipsoid( 0,     1.36,  0.04,  0.130, 0.050, 0.108,   72, C.shirtLight, pos, col, 0.005)

    // ── SHOULDERS ─────────────────────────────────────────────────
    fillEllipsoid(-0.44,  1.35,  0,     0.170, 0.130, 0.130,  150, C.shirt, pos, col, 0.008)
    fillEllipsoid( 0.44,  1.35,  0,     0.170, 0.130, 0.130,  150, C.shirt, pos, col, 0.008)

    // ── TORSO (3 sections for natural taper) ─────────────────────
    fillEllipsoid( 0,     1.16,  0.01,  0.310, 0.175, 0.168,  420, C.shirt, pos, col, 0.009)
    fillEllipsoid( 0,     0.90,  0,     0.270, 0.170, 0.150,  340, C.shirt, pos, col, 0.009)
    fillEllipsoid( 0,     0.66,  0,     0.248, 0.135, 0.140,  255, C.shirtLight, pos, col, 0.008)

    // ── BELT ──────────────────────────────────────────────────────
    fillEllipsoid( 0,     0.535, 0,     0.255, 0.026, 0.136,  105, C.belt,  pos, col, 0.003)
    fillEllipsoid( 0,     0.535, 0.10,  0.044, 0.026, 0.018,   26, C.buckle,pos, col, 0.002)

    // ── WAIST / TOP OF PANTS ──────────────────────────────────────
    fillEllipsoid( 0,     0.40,  0,     0.246, 0.118, 0.136,  185, C.pants, pos, col, 0.008)

    // ── LEFT ARM (hanging naturally) ──────────────────────────────
    fillEllipsoid(-0.53,  1.08,  0.01,  0.098, 0.258, 0.096,  175, C.shirt, pos, col, 0.008)
    fillEllipsoid(-0.55,  0.70,  0.04,  0.086, 0.200, 0.086,  145, C.shirt, pos, col, 0.007)
    // left hand
    fillEllipsoid(-0.54,  0.44,  0.05,  0.072, 0.100, 0.058,   78, C.skin,  pos, col, 0.005)
    // left fingers (subtle)
    fillEllipsoid(-0.50,  0.32,  0.06,  0.040, 0.060, 0.035,   35, C.skin,  pos, col, 0.004)

    // ── RIGHT ARM (hand in pocket) ────────────────────────────────
    fillEllipsoid( 0.53,  1.08,  0,     0.098, 0.258, 0.096,  175, C.shirt, pos, col, 0.008)
    fillEllipsoid( 0.50,  0.71, -0.01,  0.082, 0.196, 0.082,  138, C.shirt, pos, col, 0.007)
    // right hand (partially hidden in pocket)
    fillEllipsoid( 0.46,  0.48,  0,     0.054, 0.065, 0.050,   48, C.skin,  pos, col, 0.004)

    // ── WATCH (right wrist) ───────────────────────────────────────
    fillEllipsoid( 0.49,  0.60,  0,     0.056, 0.028, 0.056,   42, C.watch, pos, col, 0.003)
    fillEllipsoid( 0.49,  0.60,  0.06,  0.025, 0.020, 0.012,   18, C.buckle,pos, col, 0.002) // watch face

    // ── AMBIENT DUST PARTICLES ────────────────────────────────────
    for (let i = 0; i < 220; i++) {
      const x = (Math.random() - .5) * 8
      const y = (Math.random() - .5) * 5 + 0.9
      const z = (Math.random() - .5) * 4.5 - 1.2
      pos.push(x, y, z)
      const c = new THREE.Color().setHSL(0.07 + Math.random() * 0.07, 0.3, 0.05 + Math.random() * 0.08)
      col.push(c.r, c.g, c.b)
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(pos), 3))
    geo.setAttribute('color',    new THREE.Float32BufferAttribute(new Float32Array(col), 3))

    const glowTex = makeGlowTex()
    return { geometry: geo, glowTex }
  }, [])

  // Store original positions for breathing effect
  const origPos = useMemo(() => {
    const arr = geometry.getAttribute('position') as THREE.BufferAttribute
    return new Float32Array(arr.array)
  }, [geometry])

  useFrame((state) => {
    if (!ref.current || !matRef.current) return
    clock.current += 0.008

    const t = clock.current
    const [mx, my] = mouse.current

    // Physics-like floating
    ref.current.position.y = -0.92 + Math.sin(t * 0.7) * 0.018

    // Spring-like rotation toward mouse
    ref.current.rotation.y += (mx * 0.24 - ref.current.rotation.y) * 0.04
    ref.current.rotation.x += (my * 0.06 - ref.current.rotation.x) * 0.04

    // Subtle breathing — only chest particles
    const posArr = geometry.getAttribute('position') as THREE.BufferAttribute
    for (let i = 0; i < posArr.count; i++) {
      const oy = origPos[i * 3 + 1]
      if (oy > 0.9 && oy < 1.4) {
        const oz = origPos[i * 3 + 2]
        posArr.setZ(i, oz + Math.sin(t * 1.2 + i * 0.02) * 0.004)
      }
    }
    posArr.needsUpdate = true

    // Shimmer
    matRef.current.opacity = 0.88 + Math.sin(t * 1.4) * 0.045
  })

  return (
    <points ref={ref} geometry={geometry} position={[0, 0, 0]}>
      <pointsMaterial
        ref={matRef}
        size={0.012}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        map={glowTex}
        alphaTest={0.01}
        depthWrite={false}
      />
    </points>
  )
}

// ── Floating orbs behind the figure ─────────────────────────────
function Orbs() {
  const refs = useRef<THREE.Mesh[]>([])

  const orbs = useMemo(() =>
    Array.from({ length: 6 }, (_, i) => ({
      pos: [
        (Math.random() - .5) * 3,
        (Math.random() - .5) * 2.5 + 0.5,
        -1.5 - Math.random() * 2,
      ] as [number,number,number],
      size: 0.06 + Math.random() * 0.12,
      speed: 0.3 + Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2,
    }))
  , [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    refs.current.forEach((mesh, i) => {
      if (!mesh) return
      const o = orbs[i]
      mesh.position.y = o.pos[1] + Math.sin(t * o.speed + o.phase) * 0.18
      mesh.position.x = o.pos[0] + Math.cos(t * o.speed * 0.7 + o.phase) * 0.08
      ;(mesh.material as THREE.MeshBasicMaterial).opacity =
        0.06 + Math.abs(Math.sin(t * o.speed * 0.5 + o.phase)) * 0.12
    })
  })

  return (
    <>
      {orbs.map((o, i) => (
        <mesh
          key={i}
          position={o.pos}
          ref={el => { if (el) refs.current[i] = el }}
        >
          <sphereGeometry args={[o.size, 8, 8]} />
          <meshBasicMaterial color="#C9A96E" transparent opacity={0.08} />
        </mesh>
      ))}
    </>
  )
}

// ── Mouse tracker inside canvas ───────────────────────────────────
function MouseTracker({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  const { gl } = useThree()
  useEffect(() => {
    const canvas = gl.domElement
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.current = [
        ((e.clientX - rect.left) / rect.width  - 0.5) * 2,
        -((e.clientY - rect.top)  / rect.height - 0.5) * 2,
      ]
    }
    canvas.addEventListener('mousemove', onMove)
    return () => canvas.removeEventListener('mousemove', onMove)
  }, [gl, mouse])
  return null
}

// ── Main export ───────────────────────────────────────────────────
export default function HeroScene() {
  const mouse = useRef<[number, number]>([0, 0])

  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
    >
      <PerspectiveCamera makeDefault fov={42} position={[0, 0.25, 3.8]} />
      <MouseTracker mouse={mouse} />
      <Orbs />
      <SajidFigure mouse={mouse} />
      <ambientLight intensity={0.15} color="#C9A96E" />
      <pointLight position={[2, 3, 2]} intensity={0.4} color="#C9A96E" />
    </Canvas>
  )
}
