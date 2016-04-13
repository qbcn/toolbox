<?php
namespace User\Model;
use Think\Model\MongoModel;

class UserModel extends MongoModel {
	protected $pk = 'uid';
	protected $_idType = self::TYPE_INT;
	protected $_autoinc = true;
}