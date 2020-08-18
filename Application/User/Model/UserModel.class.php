<?php
namespace User\Model;
use Think\Model\MongoModel;

class UserModel extends MongoModel {
	protected $pk = 'uid';
	protected $_idType = self::TYPE_INT;
	protected $_autoinc = true;

	const ADD_OK = 0;
	const ADD_FAIL = 1;
	const UPDATE_OK = 2;
	const UPDATE_FAIL = 3;
	const DATA_INVALID = 4;

	public function update($data){
		if(!empty($data['qq'])){
			$cond['qq'] = $data['qq'];
		}
		if(!empty($data['mail'])){
			$cond['mail'] = $data['mail'];
		}
		if(!empty($data['mobile'])){
			$cond['mobile'] = $data['mobile'];
		}
		if (empty($cond)){
			return self::DATA_INVALID;
		}

		unset($cond['mail']);
		$cond['_logic'] = 'OR';
        $find = $this->where($cond)->select();
        if (empty($find)){
        	$result = $this->add($data);
            if ($result) {
        		return self::ADD_OK;
        	} else {
        		return self::ADD_FAIL;
        	}
        } else {
        	$data['uid'] = end($find)['uid'];
        	$result = $this->save($data);
        	if ($result) {
        		return self::UPDATE_OK;
        	} else {
        		return self::UPDATE_FAIL;
        	}
        }
	}
}