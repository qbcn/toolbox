<?php
namespace User\Controller;
use Think\Controller;

class ApiController extends Controller {

	private function set_user(&$data,$dbkey,$inkey,$check_len=1024){
		$value = I($inkey);
		if (!empty($value) && strlen($value) <= $check_len){
			$data[$dbkey] = $value;
		}
		return;
	}

    public function save(){
        $this->set_user($data, 'qq', 'qq', 16);
        $this->set_user($data, 'mail', 'mail', 64);
        $this->set_user($data, 'mobile', 'mobile', 16);
        $this->set_user($data, 'cid', 'cid', 32); // citizen id
        $this->set_user($data, 'phone', 'phone', 16);
        $this->set_user($data, 'name', 'name', 32);
        $this->set_user($data, 'addr', 'addr', 256);
        $this->set_user($data, 'weibo', 'weibo', 64);
        $this->set_user($data, 'wechat', 'wechat', 64);
        $this->set_user($data, 'alipay', 'alipay', 64);
        $this->set_user($data, 'tbnick', 'tbnick', 32);
        $this->set_user($data, 'nicks', 'nicks', 128);
        $this->set_user($data, 'order', 'order', 128);

        $User = D("User");
        $result = $User->update($data);
        $msgs = array(
        	$User::ADD_OK => array('ret'=>true,'msg'=>'添加成功'),
        	$User::ADD_FAIL => array('ret'=>false,'msg'=>'添加失败'),
        	$User::UPDATE_OK => array('ret'=>true,'msg'=>'更新成功'),
        	$User::UPDATE_FAIL => array('ret'=>false,'msg'=>'更新失败'),
        	$User::DATA_INVALID => array('ret'=>false,'msg'=>'缺少基础参数')
        );
        $this->ajaxReturn($msgs[$result], 'JSONP');
    }

    public function merge(){
    	$from = I('from');
    	$src_db = M('Think\\Model\\MongoModel:'.$from);
    	$User = D("User");
    	$stat = array(
        	$User::ADD_OK => 0,
        	$User::ADD_FAIL => 0,
        	$User::UPDATE_OK => 0,
        	$User::UPDATE_FAIL => 0,
        	$User::DATA_INVALID => 0
        );

    	$page = 0;
    	do {
    		$page++;
    		$users = $src_db->page($page,100)->select();
    		foreach ($users as $i => $data){
    			unset($data['_id']);
    			unset($data['uid']);
    			if (!empty($data['qq'])){
    				settype($data['qq'], 'string');
    			}
    			if (!empty($data['mobile'])){
    				settype($data['mobile'], 'string');
    			}
    			if (!empty($data['phone'])){
    				settype($data['phone'], 'string');
    			}
    			if (!empty($data['order'])){
    				settype($data['order'], 'string');
    			}
    			if (!empty($data['alipay'])){
    				settype($data['alipay'], 'string');
    			}

       			$result = $User->update($data);
    			$stat[$result]++;
    		}
    	}while(!empty($users));

    	$this->ajaxReturn($stat);
    }

    public function log(){
    	$data['event'] = I('event');
    	$data['start'] = I('start');
    	$data['end'] = I('end');
    	$data['stop'] = I('stop');
    	$data['success'] = I('success');
    	$data['fail'] = I('fail');
    	$data['timeout'] = I('timeout');
    	D('Xlog')->add($data);
    	$this->ajaxReturn(array('ret'=>true,'msg'=>'汇报成功'), 'JSONP');
    }
}