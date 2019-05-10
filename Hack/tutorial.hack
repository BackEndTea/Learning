<<__EntryPoint>>
function Main()
{
    print("Hello World!\n");
}
// Hack functions are annotated with types.
function my_negation(bool $x): bool {
  return !$x;
}

// FIXME: annotate this function parameter
// and return with the type 'int'.
function add_one(int $x): int {
  return $x+1;
}

// Prefixing a type with '?' permits null.

// TODO: fix the type of the parameter $x to permit null.
function f(?int $x): void {
  var_dump($x);
}

function test_nullable(): void {
  f(123);
  f(null);
}

interface User { public function getName(): string; }

function get_user_name(?User $user): string {

  if($user !== null) {
    // We checked that $user was not null.
    // Its type is now 'User'.

    return $user->getName();
  }
  return '<invalid name>';
}

function test_user(User $user) {
  $name1 = get_user_name($user);
  $name2 = get_user_name(null);
}

interface UserTwo { public function getName(): string; }

// There are many ways to handle null values.
// Throwing an exception is one of them.

function get_user_name_two(?UserTwo $user): string {

  if($user === null) {
    throw new RuntimeException('Invalid user name');
  }
  return $user->getName();
}

function test_two(UserTwo $user) {
  $name1 = get_user_name_two($user);
  $name2 = get_user_name_two(null);
}

// Hack introduces new collection types (Vector, Set and Map).
function test_vect(): int {

  // Vector is preferred over array(1, 2, 3)
  $vector = Vector {1, 2, 3};

  $sum = 0;
  foreach ($vector as $val) {
    $sum += $val;
  }

  return $sum;
}

// Hack uses generics for Collection types.

// TODO: fix the return type of the function 'test'
function test_vect_two(): Vector<int> {
  $vector = Vector {1, 2, 3};
  return $vector;
}

function vector_add1(Vector<int> $v): Vector<int> {
  // Example of lambda expressions.
  return $v->map($x ==> $x + 1);
}

function vector_mult2(Vector<int> $v): Vector<int> {
    return $v->map($x ==> $x * 2);
  // TODO: write a function multiplying all the elements by 2
}

var_dump(vector_mult2(Vector{1,2,3}));

class Point {

  private float $x;
  private float $y;

  public function __construct(float $x, float $y) {
    $this->x = $x;
    $this->y = $y;
    // FIXME: initalize the member 'y'
  }
  public function getY(): ?float
  {
      return $this->y;
  }
}

$p = new Point(1.1, 2.0);
var_dump($p->getY());

class PointTwo {
// Check out this new syntax!
// It's shorter and does the same thing ...
  public function __construct(
    private float $x,
    private float $y
  ) {}
}

$p = new PointTwo(1.1, 2.0);
var_dump($p);

// You can create your own generics!
class Store<T> {
  public function __construct(private T $data) {}
  public function get(): T { return $this->data; }
  public function set(T $x): void { $this->data = $x; }
}

// TODO: fix the return type of the function test
function test_generic(): Store<string> {
  $data = 'Hello world!';
  $x = new Store($data);
  return $x;
}
var_dump(test_generic());

// You can specify constraints on generics.
interface MyInterface {
  public function foo(): void;
}

// TODO: uncomment 'as MyInterface'
// T as MyInterface means any object as long as
// it implements MyInterface
function call_foo<T  as MyInterface>(T $x): T {
  $x->foo();
  return $x;
}


// The type 'this' always points to the most derived type
class MyBaseClass {
  protected int $count = 0;

  // TODO: replace 'MyBaseClass' by 'this'
  public function add1(): this {
    $this->count += 1;
    return $this;
  }
}

class MyDerivedClass extends MyBaseClass {
  public function print_count(): void { echo $this->count; }
}

function test_base(): void {
  $x = new MyDerivedClass();
  $x->add1()->print_count();
}

test_base();

// When a type is too long, you can use a type alias.
type Matrix<T> = Vector<Vector<T>>;

function first_row<T>(Matrix<T> $matrix): Vector<T> {
  return $matrix[0];
}

// Tuples represent fixed size arrays.
// TODO: fix the return type.
function my_first_pair((int, bool) $pair): bool {
  list($_, $result) = $pair;
  return $result;
}

// Shapes can be used for arrays with constant string keys.
type my_shape = shape(
  'field1' => int,
  'field2' => bool,
);

function first_shape(): my_shape {
  $result = shape('field1' => 1, 'field2' => true);

  // TODO: set 'field2' to the value true
  // on $result to complete the shape.
  return $result;
}

// You can specify the types of functions too.
function apply_int<T>((function(int): T) $callback, int $value): T {
  return $callback($value);
}

// XHP is useful to build html (or xml) elements.
// The escaping is done automatically, it is important to avoid
// security issues (XSS attacks).
function build_paragraph(string $text, string $style): div { // This is broken, why?
  return
    <div style={$style}>
      <p>{$text}</p>
    </div>;
}

// var_dump(build_paragraph('hello', 'color:red'));

/* Opaque types let you hide the representation of a type.
 *
 * The definition below introduces the new type 'user_id'
 * that will only be compatible with 'int' within this file.
 * Outside of this file, 'user_id' becomes "opaque"; it won't
 * be compatible with 'int' anymore.
 */
newtype user_id = int;

function make_user_id(int $x): user_id {
  // Do some checks ...
  return $x;
}

// You should only use this function for rendering
function user_id_to_int(user_id $x): int {
  return $x;
}
class MyBaseClassTwo {
  // TODO: fix the typo in the name of the method.
  public function get_user(): MyUser {
    return new MyUser();
  }
}

class MyDerivedClassTwo extends MyBaseClassTwo {
  /* <<Override>> is used to specify that get_user has been inherited.
   * When that's not the case, Hack gives an error.
   */
  <<Override>> public function get_user(): MyUser {
    return new MyUser();
  }
}

new MyBaseClassTwo();

class C { protected function bar(): void {} }
interface I { public function foo(): void; }

// 'require' lets you specify what the trait needs to work properly.
trait T {

  // The class using the trait must extend 'C'
  require extends C;

  // TODO: uncomment the next line to fix the error
  require implements I;

  public function do_stuff(): void {
    $this->bar(); // We can access bar because we used "require extends"
    $this->foo();
  }
}
