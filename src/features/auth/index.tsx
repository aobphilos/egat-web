import { useRef, useState } from 'react';
import { supabase } from '../../utils/supabaseClient';

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

import styles from './auth.module.css';

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');
  const [displayDialog, setDisplayDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const dialog = useRef(null);

  const handleLogin = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email, password });
      if (error) throw error;
    } catch (error) {
      setErrorMessage(error.error_description || error.message);
      setDisplayDialog(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-d-flex p-jc-center">
      <div className={styles.container}>
        <div className="p-shadow-10 ">
          <div className="card ">
            <h5 className={styles.topic}>เข้าสู่ระบบ</h5>
            <div className="p-fluid">
              <div className="p-field">
                <label htmlFor="email">ชื่อผู้ใช้งาน</label>
                <InputText
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  className={styles.inputText}
                />
              </div>
              <div className="p-field">
                <label htmlFor="password">รหัสผ่าน</label>
                <InputText
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className={styles.inputText}
                />
              </div>
              <div className="p-field">
                <Button
                  icon="pi pi-sign-in"
                  iconPos="right"
                  label="เข้าสู่ระบบ"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogin(email, password);
                  }}
                  loading={loading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog
        header="Login Fail"
        visible={displayDialog}
        style={{ width: '30rem', textAlign: 'center' }}
        ref={dialog}
        onHide={() => setDisplayDialog(false)}>
        <p>{errorMessage}</p>
      </Dialog>
    </div>
  );
}
