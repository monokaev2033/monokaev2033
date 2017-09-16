<?php
class Preferences {
	private $props = [];
	private static $instance;

	private function __construct() {}

	public static function getInstance() {
		if (empty(self::$instance)) {
			self::$instance = new Preferences();
		}
		return self::$instance;
	}

	public function setProperty($key, $value) {
		$this->props[$key] = $value;
	}

	public function getProperty($key) {
		return $this->props[$key];
	}
}

$pref = Preferences::getInstance();
$pref->setProperty("name", 'Vasya');

unset($pref);

$pref2 = Preferences::getInstance();
echo $pref2->getProperty('name');