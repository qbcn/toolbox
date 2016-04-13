<?php
namespace User\Controller;
use Think\Controller;

class ApiController extends Controller {
	private function set_user(&$data,$dbkey,$inkey){
		$value = I($inkey);
		if (!empty($value)){
			$data[$dbkey] = $value;
		}
		return;
	}

    public function save(){
        $this->set_user($data, 'qq', 'qq');
        $this->set_user($data, 'mail', 'mail');
        $this->set_user($data, 'mobile', 'mobile');
        if (empty($data)){
        	$this->ajaxReturn(array('ret'=>false,'msg'=>'缺少基础参数'),'JSONP');
        	return;
        }

        $cond = $data;
        $cond['_logic'] = 'OR';
        $this->set_user($data, 'cid', 'cid'); // citizen id
        $this->set_user($data, 'phone', 'phone');
        $this->set_user($data, 'name', 'name');
        $this->set_user($data, 'addr', 'addr');
        $this->set_user($data, 'weibo', 'weibo');
        $this->set_user($data, 'wechat', 'wechat');
        $this->set_user($data, 'alipay', 'alipay');
        $this->set_user($data, 'tbnick', 'tbnick');
        $this->set_user($data, 'nicks', 'nicks');

        $User = D("User");
        $user_find = $User->where($cond)->select();
        if (empty($user_find)){
        	$result = $User->add($data);
            if ($result) {
        		$msg = array('ret'=>$result,'msg'=>'添加成功');
        	} else {
        		$msg = array('ret'=>false,'msg'=>'添加失败');
        	}
        } else {
        	$data['uid'] = end($user_find)['uid'];
        	$result = $User->save($data);
        	if ($result) {
        		$msg = array('ret'=>$data['uid'],'msg'=>'更新成功');
        	} else {
        		$msg = array('ret'=>false,'msg'=>'更新失败');
        	}
        }
        $this->ajaxReturn($msg, 'JSONP');
        return ;
    }
    
    public function log(){
    	$data['event'] = I('event');
    	$data['start'] = I('start');
    	$data['end'] = I('end');
    	$data['success'] = I('success');
    	$data['fail'] = I('fail');
    	$data['timeout'] = I('timeout');
    	D('Xlog')->add($data);
    	$this->ajaxReturn(array('ret'=>true,'msg'=>'汇报成功'), 'JSONP');
    }
}