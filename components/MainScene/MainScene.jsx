/**
 * @file MainScene.js
 */
import React, { Suspense, useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import useErrorBoundary from 'use-error-boundary'

import { useTweaks } from 'use-tweaks'
import { useInView } from 'react-intersection-observer'
import useMobileDetect from 'use-mobile-detect-hook'
import {
  extend,
  Canvas,
  useFrame,
  useThree,
  useLoader,
} from 'react-three-fiber'
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
} from '@react-three/postprocessing'
import {
  MathUtils,
  PlaneBufferGeometry,
  TextureLoader,
  RepeatWrapping,
  Vector3,
  BoxHelper,
  SpotLightHelper,
  PointLightHelper,
} from 'three'

import { useHelper, OrbitControls, useCubeTexture } from '@react-three/drei'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { VertexNormalsHelper } from 'three/examples/jsm/helpers/VertexNormalsHelper'
import { FaceNormalsHelper } from 'three/examples/jsm/helpers/FaceNormalsHelper'
import { gsap } from 'gsap'
import { easeExpOut, easeCubicOut } from 'd3-ease'

import styles from './MainScene.module.css'

// const bumpMap = useLoader(TextureLoader, '/3d/bumps/fabric-bump.png')
// bumpMap.wrapS = bumpMap.wrapT = RepeatWrapping
// bumpMap.repeat.set(1, 1)
//
// Application
// <meshStandardMaterial
//    envMap={envMap}
//    attach="material"
//    roughness={0}
//    metalness={0.9}
//    bumpMap={bumpMap}
//    color="#3083DC"
//  />

// Effects for the main scene
const Effects = () => {
  return (
    <EffectComposer>
      <Bloom />
    </EffectComposer>
  )
}

const Scene = () => {
  const mesh = useRef()
  const { scene } = useThree()
  const group = useRef()

  const spotLight = useRef()
  const pointLight = useRef()

  const [animate, setAnimate] = useState(false)

  // useFrame(({ clock }) => {
  //   mesh.current.rotation.x = (Math.sin(clock.elapsedTime) * Math.PI) / 4
  //   mesh.current.rotation.y = (Math.sin(clock.elapsedTime) * Math.PI) / 4
  //   mesh.current.rotation.z = (Math.sin(clock.elapsedTime) * Math.PI) / 4
  //   mesh.current.position.x = Math.sin(clock.elapsedTime)
  //   mesh.current.position.z = Math.sin(clock.elapsedTime)
  //   group.current.rotation.y += 0.02
  // })

  useEffect(() => void (spotLight.current.target = mesh.current), [scene])

  // Texture loading examples
  const envMap = useCubeTexture(
    ['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'],
    { path: '/3d/color/' }
  )

  const bumpMap = useLoader(TextureLoader, '/3d/bumps/fabric-bump.png')
  bumpMap.wrapS = bumpMap.wrapT = RepeatWrapping
  bumpMap.repeat.set(1, 1)

  // useHelper(spotLight, SpotLightHelper, 'teal')
  // useHelper(pointLight, PointLightHelper, 0.5, 'hotpink')
  // useHelper(mesh, BoxHelper, '#272740')
  // useHelper(mesh, VertexNormalsHelper, 1, '#272740')
  // useHelper(mesh, FaceNormalsHelper, 0.5, '#272740')

  useEffect(() => {
    if (animate) {
      gsap.to(mesh.current.rotation, {
        x: 20,
        y: -13,
        repeat: 1,
        yoyo: true,
        duration: 4,
        ease: easeExpOut,
      })

      gsap.to(mesh.current.position, {
        x: -5,
        y: 4,
        z: 5,
        repeat: 1,
        yoyo: true,
        duration: 4,
        ease: easeExpOut,
        onComplete: () => setAnimate(false),
      })
    }
  }, [mesh, animate])

  return (
    <>
      <pointLight position={[-10, 0, -20]} color="lightblue" intensity={2.5} />
      <group ref={group}>
        <pointLight
          ref={pointLight}
          color="blue"
          position={[4, 4, 0]}
          intensity={5}
        />
      </group>
      <spotLight
        castShadow
        position={[2, 5, 2]}
        ref={spotLight}
        angle={0.5}
        distance={20}
      />
      <mesh
        ref={mesh}
        position={[0, 2, 0]}
        castShadow
        onClick={() => setAnimate(!animate)}
      >
        <boxBufferGeometry attach="geometry" />
        <meshStandardMaterial
          envMap={envMap}
          attach="material"
          color="lightblue"
          metalness={0.9}
          roughness={0}
          bumpMap={bumpMap}
          opacity={0.5}
        />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <planeBufferGeometry args={[100, 100]} attach="geometry" />
        <shadowMaterial attach="material" opacity={0.5} />
      </mesh>
      <gridHelper args={[30, 30, 30]} />
    </>
  )
}

const MainScene = (props) => {
  const { tagName: Tag, className, variant, children } = props

  const { ErrorBoundary, didCatch, error } = useErrorBoundary()

  return (
    <ErrorBoundary>
      <Tag
        colorManagement
        shadowMap
        camera={{ position: [-5, 5, 5] }}
        className={`${styles.main_scene} ${
          styles[`main_scene__${variant}`]
        } ${className}`}
        style={{
          width: '100vw',
          height: 'calc(100vh - 50px)',
          background: '#111111',
        }}
      >
        <fog attach="fog" args={['#111111', 0, 20]} />
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
        <Effects />
        <OrbitControls />
      </Tag>
    </ErrorBoundary>
  )
}

MainScene.propTypes = {
  tagName: PropTypes.object,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default']),
}

MainScene.defaultProps = {
  tagName: Canvas,
  className: '',
  variant: 'default',
}

export default MainScene
