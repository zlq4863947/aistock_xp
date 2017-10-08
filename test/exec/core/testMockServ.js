/**
 * Created by 23tl on 2017/4/16.
 */
import MockServ from '../../../src/app/core/mockDdeServer';
import timelineplayer from 'timelineplayer';

const mockServ = new MockServ('5341.T', '2017-05-01', 10); //10
mockServ.start();