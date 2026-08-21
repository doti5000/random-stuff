(module
  (memory (export "mem") 1)
  (func (export "decrypt") (param $len i32) (param $key i32) (param $entropy i32)
    (local $i i32)
    (local $byte i32)
    (local.set $i (i32.const 0))
    
    (block $entropy_check
      (br_if $entropy_check (i32.ge_u (local.get $entropy) (i32.const 100)))
      (local.set $key (i32.xor (local.get $key) (i32.const 255)))
    )

    (loop $my_loop
      (block $my_block
        (br_if $my_block (i32.ge_s (local.get $i) (local.get $len)))
        (local.set $byte (i32.load8_u (local.get $i)))
        (i32.store8 (local.get $i) (i32.xor (local.get $byte) (local.get $key)))
        (local.set $i (i32.add (local.get $i) (i32.const 1)))
        (br $my_loop)
      )
    )
  )
)
